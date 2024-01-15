import EstablishmentCategoryService from "../services/establishmentCategory.service";
import { Request, Response } from "express";

class EstablishmentCategoryController {
    constructor(
        private readonly establishmentCategoryService: EstablishmentCategoryService = new EstablishmentCategoryService(),
    ) {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }


    async getAll(_request: Request, response: Response) {
        try {
            const establishmentCategories = await this.establishmentCategoryService.getAll({
                include: {
                    establishment: true,
                    category: true
                },
            });
            response.json(establishmentCategories);
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }

    async getById(request: Request, response: Response) {
        try {
            const establishmentCategory = await this.establishmentCategoryService.getById(Number(request.params.id));
            response.json(establishmentCategory);
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }

    async create(request: Request, response: Response) {
        try {
            const establishmentCategory = await this.establishmentCategoryService.create(request.body);
            response.json(establishmentCategory);
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const establishmentCategory = await this.establishmentCategoryService.update(Number(request.params.id), request.body);
            response.json(establishmentCategory);
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const establishmentCategory = await this.establishmentCategoryService.delete(Number(request.params.id));
            response.json(establishmentCategory);
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }
}

export default EstablishmentCategoryController;