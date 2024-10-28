import { MeetingNote } from '@/interfaces/meetingNotes.interface';
import { AgendaService } from '@/services/agenda.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class AgendaController {
  public agenda = Container.get(AgendaService);

  public suggestAgenda = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const meetingNotesData: MeetingNote[] = req.body.meetingNotes;
      const openAIModelData: string | undefined = req.body.openAIModel;
      const suggestAgendaData = await this.agenda.suggestAgenda(meetingNotesData, openAIModelData);

      res.status(200).json({ data: suggestAgendaData, message: 'suggestAgenda' });
    } catch (error) {
      next(error);
    }
  };
}
