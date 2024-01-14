import { Category, Prisma } from "@prisma/client";

export interface CategoryRepositoryInterface {
    getAll(): Promise<Category[]>;
    getById(id: number): Promise<Category | null>;
    getByName(name: string): Promise<Category | null>;
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category | null>;
    delete(id: number): Promise<Category | null>;
    deleteAll(): Promise<Prisma.BatchPayload>;
}