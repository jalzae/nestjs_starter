import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async destroy(table: string, where: any) {
    try {
      const updateData = await this.prisma[table].delete({
        where
      });

      return updateData;
    } catch (e: any) {
      return false;
    }
  }
}
