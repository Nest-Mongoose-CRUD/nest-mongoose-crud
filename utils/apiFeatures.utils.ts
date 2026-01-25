import APIFeaturesInterface from 'src/interfaces/apiFeatures.interface';
import IQuery from 'src/interfaces/query.interface';
// import IPayload from 'src/interfaces/payload.interface';
// import generateApiFilter from './generateApiFilter';
// import advancedFilter from './advancedFilter';

// find({
//   isActive: true,
//   role: { $in: [UserRole.ADMIN, UserRole.USER] },
//   age: { $gte: 20, $lte: 30 },
//   firstName: { $regex: 'john', $options: 'i' },
// });

// /api/users?age[gte]=20&age[lte]=30

// {
//   "age": {
//     "gte": "20",
//     "lte": "30"
//   }
// }

import type { Query, Document } from 'mongoose';

class APIFeatures<T extends Document> {
  query: Query<T[], T>;
  queryString: IQuery;

  constructor(query: Query<T[], T>, queryString: IQuery) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    console.log({ queryObj });

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    const filter = Object.entries(queryObj).reduce((acc, [key, value]) => {
      //  queryObj: { role: 'admin', 'age[gte]': '20', 'age[lte]': '30' } }

      const params = {
        '[gte]': '$gte',
        '[gt]': '$gt',
        '[lte]': '$lte',
        '[lt]': '$lt',
      };

      if (key.includes('gte'))
        if (params[key]) {
          acc[params[key]] = value;
        } else {
          acc[key] = { $in: value.split(',') };
        }

      return acc;
    }, {});

    console.log({ filter });

    this.query = this.query.find(filter);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields) as unknown as Query<T[], T>;
    } else {
      this.query = this.query.select('-v') as unknown as Query<T[], T>;
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page ? +this.queryString.page : 1;
    const limit = this.queryString.limit ? +this.queryString.limit : 10;
    const skip = (page - 1) * limit;

    // page=2&limit=10
    this.query = this.query.skip(skip).limit(limit);
    // this.queryString.limit = limit;

    return this;
  }

  private advancedFilter(payload: any): any {
    const params = { gte: '$gte', gt: '$gt', lte: '$lte', lt: '$lt' };

    return Object.keys(payload).reduce((acc, key) => {
      if (params[key]) acc[params[key]] = payload[key];
      return acc;
    }, {});
  }
}

export default APIFeatures;
