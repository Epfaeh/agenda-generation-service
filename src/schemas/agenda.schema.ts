import { Agenda } from '@/interfaces/agenda.interface';
import { z, ZodType } from 'zod';

export const agendaSchema = z.object({
  agenda: z
    .array(
      z.object({
        topic: z.string().describe('Title of the agenda item'),
        details: z.string().describe('Detailed description of the agenda item'),
        motivationFactors: z.array(z.string()).describe('Addressed motivation factors for the suggested topic e.g., ["Autonomy", "Mastery"]'),
        leadershipApproach: z.string().optional().describe('Suggested leadership style or approach (optional)'),
      }),
    )
    .describe('Suggested agenda for the next 1-on-1 meeting'),

  additionalNotes: z.string().optional().describe('Any additional recommendations or considerations for the meeting (optional)'),
}) satisfies ZodType<Agenda>;
