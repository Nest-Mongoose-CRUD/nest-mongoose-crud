import APIFeatures from './apiFeatures.utils';
import IQuery from '../src/interfaces/query.interface';

import IPayload from '../src/interfaces/payload.interface';

import { NotFoundException } from '@nestjs/common';

import { Model, Document, FilterQuery } from 'mongoose';

export const getAll = async <T extends Document>(
  model: Model<T>,
  query: IQuery,
) => {
  const payload = new APIFeatures(model.find(), query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // .search()
  // .gt()
  // .lt()
  // .gte()
  // .lte()
  // .range()
  // .relations().payload;

  console.log({ model, payload });

  // console.log(JSON.stringify(payload));

  const limit = query.limit ? +query.limit : 10;

  const page = query.page ? +query.page : 1;

  const result = await model.find(payload);

  const count = await model.countDocuments(payload);

  const pages = Math.ceil(count / +limit);

  const nextPage = +page < pages ? +page * 1 + 1 : null;

  const prevPage = +page > 1 ? +page - 1 : null;

  return {
    status: 'success',
    total: result.length,
    nextPage,
    prevPage,
    count,
    pages,
    currentPage: page,
    data: result,
  };
};

export const getOne = async (
  model: any,
  id: string,
  query: Partial<IQuery>,
) => {
  const { relations } = query;

  const payload: any = { where: { id } };

  if (relations) payload.relations = relations.split(',');

  const [result] = await model.find(payload);

  if (!result) throw new NotFoundException('No resource with that ID');

  return { status: 'success', data: result };
};

export const createOne = async (model: any, payload: any) => {
  const data = model.create(payload);

  const result = await model.save(data);

  return { status: 'success', data: result };
};

export const updateOneOne = async (model: any, id: string, payload: any) => {
  const data = await model.findOneBy({ id });

  if (!data) throw new NotFoundException('No resource with that ID');

  await model.update({ id }, payload);

  const saved = await model.findOneBy({ id });

  return { status: 'success', data: saved };
};

export const deleteOne = async (model: any, id: string) => {
  const data = await model.findOneBy({ id });

  if (!data) throw new NotFoundException('No resource with that ID');

  return model.delete({ id });
};
