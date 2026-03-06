"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIFeatures {
    query;
    queryString;
    filterObject = {};
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = [
            'page',
            'sort',
            'limit',
            'fields',
            'search',
            'populate',
        ];
        excludedFields.forEach((el) => delete queryObj[el]);
        const filter = Object.entries(queryObj).reduce((acc, [key, value]) => {
            const params = {
                gte: '$gte',
                gt: '$gt',
                lte: '$lte',
                lt: '$lt',
            };
            if (key.includes('gte') ||
                key.includes('gt') ||
                key.includes('lte') ||
                key.includes('lt')) {
                const match = key.match(/\[(.*?)\]/);
                const operator = match ? match[1] : null;
                if (!operator)
                    return acc;
                const [field] = key.split(`[${operator}]`);
                if (!acc[field])
                    acc[field] = {};
                const mongoOperator = params[operator];
                if (mongoOperator) {
                    acc[field][mongoOperator] = value;
                }
            }
            else {
                acc[key] = { $in: value.split(',') };
            }
            return acc;
        }, {});
        this.filterObject = filter;
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-v');
        }
        return this;
    }
    paginate() {
        const page = this.queryString.page ? +this.queryString.page : 1;
        const limit = this.queryString.limit ? +this.queryString.limit : 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
    search() {
        if (this.queryString.search) {
            const [term, fields] = this.queryString.search.split(':');
            if (!term || !fields)
                return this;
            const fieldArray = fields.split(',');
            const searchConditions = fieldArray.map((field) => ({
                [field]: { $regex: term, $options: 'i' },
            }));
            if (this.filterObject.$or) {
                this.filterObject.$or.push(...searchConditions);
            }
            else {
                this.filterObject.$or = searchConditions;
            }
        }
        this.query = this.query.find(this.filterObject);
        return this;
    }
    populate() {
        if (this.queryString.populate) {
            const optionsArr = this.queryString.populate.split('|');
            const options = optionsArr.map((option) => {
                const [path, fields] = option.split(':');
                const select = fields ? fields.split(',').join(' ') : '-v';
                return { path, select };
            });
            this.query = this.query.populate(options);
        }
        return this;
    }
}
exports.default = APIFeatures;
//# sourceMappingURL=apiFeatures.utils.js.map