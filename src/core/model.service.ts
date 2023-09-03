import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as models from '../../app/model/index';
@Injectable()
export class ModelService {
  constructor(private prisma: PrismaService) { }

  async create(table: string, data: any) {
    try {
      const createData = await this.prisma[table].create({
        data,
      });

      return createData;
    } catch (e: any) {
      return false;
    }
  }

  async createMany(table: string, data: any) {
    try {
      const createData = await this.prisma[table].createMany({
        data,
      });

      return createData;
    } catch (e: any) {
      return false;
    }
  }

  async findAll(table: string, where: Record<any, any> = {}) {
    try {

      const datas = await this.prisma[table].findMany({
        where,
      });

      return datas;
    } catch (e: any) {
      return false;
    }
  }

  async findOne(table: string, where: Record<string, any> = {}) {
    try {
      const data = await this.prisma[table].findFirst({
        where,
      });

      return data;
    } catch (e: any) {
      return false;
    }
  }

  async update(table: string, data: any, where: Record<string, any> = {}) {
    try {
      const updateData = await this.prisma[table].update({
        data: data,
        where
      });

      return updateData;
    } catch (e: any) {
      return false;
    }
  }

  async updateMany(table: string, data: any, where: Record<string, any> = {}) {
    try {
      const updateData = await this.prisma[table].updateMany({
        data: data,
        where
      });

      return updateData;
    } catch (e: any) {
      return false;
    }
  }

  async upsert(table: string, update: any, create: any, where: Record<string, any> = {}) {
    try {
      const updateData = await this.prisma[table].upsert({
        where,
        update,
        create
      });

      return updateData;
    } catch (e: any) {
      return false;
    }
  }

  async destroy(table: string, where: any) {
    try {
      const check = this.isClassParanoid(table)
      let result = false
      if (check) {
        const data = {}
        const name = this.paranoidTable(table)
        data[name] = new Date()

        result = await this.prisma[table].update({
          where,
          data,
        });

      } else {
        result = await this.prisma[table].delete({
          where
        });
      }

      return result;
    } catch (e: any) {
      return false;
    }
  }

  async findOrCreate(table: string, where: any, data: any) {
    try {
      let createData = await this.findOne(table, where)
      if (!createData.status) {
        createData = await this.prisma[table].create({
          data,
        });
      }

      return createData;
    } catch (e: any) {
      return false;
    }
  }

  paranoidTable(targetClass: any): string {
    try {
      const instance = new models[targetClass]();

      if (typeof instance.setup === 'function') {
        const setup = instance.setup();
        if (setup.paranoid && setup.delete) {
          return setup.delete;
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  isClassParanoid(targetClass: any): boolean {
    try {
      const instance = new models[targetClass]();

      if (typeof instance.setup === 'function') {
        const setup = instance.setup();
        if (setup.paranoid) {
          return true;
        }
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  }

}
