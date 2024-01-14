import { Prisma, PrismaClient } from "@prisma/client";
import EstablishmentCategoryRepositoryInterface from "../interface/repositories/establishmentCategory.interface";



class EstablishmentCategoryRepository implements EstablishmentCategoryRepositoryInterface {
    constructor(
        private prisma: PrismaClient = new PrismaClient()
    ) {}

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

    async getByEstablishmentIdAndCategoryId(establishmentId: number, categoryId: number) {
        return this.prisma.establishmentCategory.findFirst({
            where: { establishmentId, categoryId }
        });
    }
}

export default new EstablishmentCategoryRepository();