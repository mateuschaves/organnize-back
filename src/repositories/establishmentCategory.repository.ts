import { Prisma, PrismaClient } from "@prisma/client";

class EstablishmentCategoryRepository {
    constructor(
        private prisma: PrismaClient = new PrismaClient()
    ) {}

    async getAll() {
        return this.prisma.establishmentCategory.findMany();
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