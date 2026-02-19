import { Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Document } from 'mongoose';
import type IQuery from './interfaces/query.interface';
import { BaseCrudService } from './base-crud.service';

/**
 * Simple abstract CRUD controller
 * Apply guards and interceptors using standard NestJS decorators
 */
export abstract class BaseCrudController<T extends Document> {
  protected abstract service: BaseCrudService<T>;

  @Get()
  async getAll(@Query() query: IQuery) {
    return this.service.getAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Query() query: Partial<IQuery>) {
    return this.service.getOne(id, query);
  }

  @Post()
  async create(@Body() payload: Partial<T>) {
    return this.service.createOne(payload);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: Partial<T>) {
    return this.service.updateOne(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.deleteOne(id);
  }
}
