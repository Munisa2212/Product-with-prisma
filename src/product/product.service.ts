import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateProductDto, req: Request) {
    let id = req["user-id"]
    const one = await this.prisma.product.create({data: {...data, userId: id}})
    return one
  }

  async findAll() {
    const one = await this.prisma.product.findMany()
    return one;
  }

  async findOne(id: string) {
    const one = await this.prisma.product.findFirst({where: {id}})
    return one;
  }

  async update(id: string, data: UpdateProductDto) {
    const one = await this.prisma.product.update({where: {id}, data})
    return one;
  }

  async remove(id: string) {
    const one = await this.prisma.product.delete({where: {id}})
    return one;
  }
}
