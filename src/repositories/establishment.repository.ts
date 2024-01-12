import { Prisma, PrismaClient } from "@prisma/client";

class EstablishmentRepository {
    constructor(
        private prisma: PrismaClient = new PrismaClient()
    ) {}

    async getAll() {
        return this.prisma.establishment.findMany();
    }

    async getById(id: number) {
        return this.prisma.establishment.findUnique({
            where: { id }
        });
    }

    async create(data: Prisma.EstablishmentCreateInput) {
        return this.prisma.establishment.create({
            data
        });
    }

    async update(id: number, data: Prisma.EstablishmentUpdateInput) {
        return this.prisma.establishment.update({
            where: { id },
            data
        });
    }

    async delete(id: number) {
        return this.prisma.establishment.delete({
            where: { id }
        });
    }

    async deleteAll() {
        return this.prisma.establishment.deleteMany();
    }

    async getEstablishmentByName(name: string) {
        return this.prisma.establishment.findFirst({
            where: { name }
        });
    }

}

export default new EstablishmentRepository();