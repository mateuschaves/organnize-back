import { Prisma, PrismaClient } from "@prisma/client";
import EstablishmentCategoryRepositoryInterface from "../interface/repositories/establishmentCategory.interface";
import PrismaInstance from "../config/db";

class EstablishmentCategoryRepository implements EstablishmentCategoryRepositoryInterface {
    constructor(
        private prisma: PrismaClient = PrismaInstance
    ) {}
    getByEstablishmentIdAndCategoryId(establishmentId: number, categoryId: number): Promise<{ id: number; categoryId: number; establishmentId: number; createdAt: Date; updatedAt: Date; } | null> {
        throw new Error("Method not implemented.");
    }

    async getAll<T>(args?: Prisma.EstablishmentCategoryFindManyArgs): Promise<T[]> {
        return this.prisma.establishmentCategory.findMany(args) as unknown as T[];
    }

    async getById(id: number) {
        return this.prisma.establishmentCategory.findUnique({
            where: { id }
        });
    }

    async create(data: Prisma.EstablishmentCategoryUncheckedCreateInput) {
        return this.prisma.establishmentCategory.create({
            data
        });
    }

    async delete(id: number) {
        return this.prisma.establishmentCategory.delete({
            where: { id }
        });
    }

    async update(id: number, data: Prisma.EstablishmentCategoryUncheckedUpdateInput) {
        return this.prisma.establishmentCategory.update({
            where: { id },
            data
        });
    }
}

export default new EstablishmentCategoryRepository();