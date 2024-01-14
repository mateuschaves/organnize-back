import CategoryService from "../services/category.service";
import { Request, Response } from 'express';

class CategoryController {
    constructor(
        private readonly _categoryService: CategoryService = new CategoryService(),
    ) {
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async getAll(_request: Request, response: Response) {
       try {
            const categories = await this._categoryService.getAll();

            return response.json(categories);
       } catch (error) {
            return response.status(500).json({ error: error.message });
       }
    }

    public async create(request: Request, response: Response) {
        try {
            const { name } = request.body;

            const category = await this._categoryService.create({ name });

            return response.json(category);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { name } = request.body;

            const category =  await this._categoryService.update(Number(id), { name });

            return response.json(category);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    public async delete(request: Request, response: Response) {
        try {
            const { id } = request.params;

            await this._categoryService.delete(Number(id));

            return response.status(204).send();
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}

export default CategoryController;