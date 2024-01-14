import { Prisma } from '@prisma/client';
import EstablishmentRepositoryInterface from '../interface/repositories/establishment.interface';
import EstablishmentRepository from '../repositories/establishment.repository';
class EstablishmentService {
    constructor(
        private readonly establishmentRepository: EstablishmentRepositoryInterface = EstablishmentRepository,
    ) {}

    async getAll() {
        return await this.establishmentRepository.getAll();
    }

    async getById(id: number) {
        return await this.establishmentRepository.getById(id);
    }

    async create(establishment: Prisma.EstablishmentCreateInput) {
        return await this.establishmentRepository.create(establishment);
    }

    async update(id: number, updateInput: Prisma.EstablishmentUpdateInput) {
        return await this.establishmentRepository.update(id, updateInput);
    }

    async delete(id: number) {
        return await this.establishmentRepository.delete(id);
    }
}

export default new EstablishmentService();