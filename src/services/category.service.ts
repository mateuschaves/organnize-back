import { Prisma } from "@prisma/client";
import { CategoryRepositoryInterface } from "../interface/repositories/category.inteface";
import CategoryRepository from "../repositories/category.repository";

class CategoryService {
    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface = CategoryRepository,
    ) { }

    public async getAll(args?: Prisma.CategoryFindManyArgs) {
        return await this.categoryRepository.getAll(args);
    }

    public async create(createInput: Prisma.CategoryCreateInput) {
        return await this.categoryRepository.create(createInput);
    }

    public async update(id: number, updateInput: Prisma.CategoryUpdateInput) {
        const category = await this.categoryRepository.getById(id);
        if (!category) {
            throw new Error('Category not found');
        }

        return await this.categoryRepository.update(id, updateInput);
    }

    public async delete(id: number) {
        const category = await this.categoryRepository.getById(id);
        if (!category) {
            throw new Error('Category not found');
        }

        return await this.categoryRepository.delete(id);
    }
}

export default CategoryService;