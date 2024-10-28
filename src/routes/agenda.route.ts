import { AgendaController } from '@/controllers/agenda.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class AgendaRoute implements Routes {
  public path = '/agenda';
  public router = Router();

  public agenda = new AgendaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/suggest`, this.agenda.suggestAgenda);
  }
}
