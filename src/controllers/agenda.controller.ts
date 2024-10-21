import { AgendaService } from '@/services/agenda.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class AgendaController {
  public agenda = Container.get(AgendaService);

  public suggestAgenda = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const suggestAgendaData = await this.agenda.suggestAgenda();

      res.status(200).json({ data: suggestAgendaData, message: 'suggest' });
    } catch (error) {
      next(error);
    }
  };
}
