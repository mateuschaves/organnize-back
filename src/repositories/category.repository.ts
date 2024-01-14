import { Prisma, PrismaClient } from '@prisma/client';
import { CategoryRepositoryInterface } from '../interface/repositories/category.inteface';
import PrismaInstance from '../config/db';

class CategoryRepository implements CategoryRepositoryInterface {
    constructor(
        private prisma: PrismaClient = PrismaInstance
    ) {}

    async getAll() {
        return this.prisma.category.findMany();
    }

    async getById(id: number) {
        return this.prisma.category.findUnique({
            where: { id }
        });
    }

    async getByName(name: string) {
        return this.prisma.category.findFirst({
            where: { name }
        });
    }

    async create(data: Prisma.CategoryCreateInput) {
        return this.prisma.category.create({
            data
        });
    }

    async update(id: number, data: Prisma.CategoryUpdateInput) {
        return this.prisma.category.update({
            where: { id },
            data
        });
    }

    async delete(id: number) {
        return this.prisma.category.delete({
            where: { id }
        });
    }

    async deleteAll() {
        return this.prisma.category.deleteMany();
    }
}

export default new CategoryRepository();