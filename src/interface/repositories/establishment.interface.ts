import { Establishment, Prisma } from "@prisma/client";

export default interface EstablishmentRepositoryInterface {
    getAll(): Promise<Establishment[]>;
    getById(id: number): Promise<Establishment | null>;
    getByName(name: string): Promise<Establishment>;
    create(data: Prisma.EstablishmentCreateInput): Promise<Establishment>;
    update(id: number, data: Prisma.EstablishmentUpdateInput): Promise<Establishment>;
    delete(id: number): Promise<Establishment>;
    deleteAll(): Promise<Prisma.BatchPayload>;
}