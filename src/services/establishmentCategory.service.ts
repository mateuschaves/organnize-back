import { Prisma } from "@prisma/client";
import EstablishmentCategoryRepositoryInterface from "../interface/repositories/establishmentCategory.interface";
import EstablishmentCategoryRepository from "../repositories/establishmentCategory.repository";

class EstablishmentCategory {

    constructor(
        private readonly establishmentCategoryRepository: EstablishmentCategoryRepositoryInterface = EstablishmentCategoryRepository,
    ) {}

    async getAll(args?: Prisma.EstablishmentCategoryFindManyArgs) {
        return this.establishmentCategoryRepository.getAll(args);
    }

    async getById(id: number) {
        return this.establishmentCategoryRepository.getById(id);
    }

    async create(data: Prisma.EstablishmentCategoryUncheckedCreateInput) {
        return this.establishmentCategoryRepository.create(data);
    }

    async update(id: number, data: Prisma.EstablishmentCategoryUncheckedUpdateInput) {
        return this.establishmentCategoryRepository.update(id, data);
    }

    async delete(id: number) {
        return this.establishmentCategoryRepository.delete(id);
    }
}

export default EstablishmentCategory;