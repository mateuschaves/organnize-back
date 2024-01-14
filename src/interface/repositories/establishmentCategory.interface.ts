import { EstablishmentCategory, Prisma } from "@prisma/client";

export default interface EstablishmentCategoryRepositoryInterface {
    getAll<T>(args?: Prisma.EstablishmentCategoryFindManyArgs): Promise<T[]>;
    getById(id: number): Promise<EstablishmentCategory | null>;
    create(data: Prisma.EstablishmentCategoryUncheckedCreateInput): Promise<EstablishmentCategory>;
    delete(id: number): Promise<EstablishmentCategory>;
    update(id: number, data: Prisma.EstablishmentCategoryUncheckedUpdateInput): Promise<EstablishmentCategory>;
}