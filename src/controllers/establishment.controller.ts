import EstablishmentService from "../services/establishment.service";
import { Request, Response } from 'express';
class EstablishmentController {
  constructor (
    private readonly establishmentService: typeof EstablishmentService = EstablishmentService
  ){
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

    public async getAll(_request: Request, response: Response) {
        try {
        const establishments = await this.establishmentService.getAll();
    
        return response.json(establishments);
        } catch (error: any) {
        return response.status(500).json({ error: error.message });
        }
    }

    public async getById(request: Request, response: Response) {
        try {
        const { id } = request.params;
    
        const establishment = await this.establishmentService.getById(Number(id));
    
        return response.json(establishment);
        } catch (error:any) {
        return response.status(500).json({ error: error.message });
        }
    }

    public async create(request: Request, response: Response) {
        try {
        const { name } = request.body;
    
        const establishment = await this.establishmentService.create({ name });
    
        return response.json(establishment);
        } catch (error: any) {
        return response.status(500).json({ error: error.message });
        }
    }

    public async update(request: Request, response: Response) {
        try {
        const { id } = request.params;
        const { name } = request.body;
    
        const establishment =  await this.establishmentService.update(Number(id), { name });
    
        return response.json(establishment);
        } catch (error: any) {
        return response.status(500).json({ error: error.message });
        }
    }

    public async delete(request: Request, response: Response) {
        try {
        const { id } = request.params;
    
        await this.establishmentService.delete(Number(id));
    
        return response.status(204).send();
        } catch (error: any) {
        return response.status(500).json({ error: error.message });
        }
    }


}

export default EstablishmentController;