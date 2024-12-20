import { MeetingNote } from '@/interfaces/meetingNotes.interface';

export const MeetingNoteModel: MeetingNote[] = [
  {
    id: 1,
    notes:
      'Discussed project deadlines, workload balance, and personal development goals for the next quarter. Employee expressed concerns about balancing multiple projects.',
    actionPoints: [
      { description: 'Reprioritize tasks to manage workload better', completed: false },
      { description: 'Review project deadlines with the team', completed: false },
    ],
    goals: [
      { title: 'Improve time management', description: 'Achieve better time distribution between projects', achievedPercent: 40 },
      { title: 'Professional development', description: 'Complete a course on leadership skills', achievedPercent: 20 },
    ],
  },
  {
    id: 2,
    notes: `Talked about the team's progress on the new product feature. Employee wants to take on more leadership responsibilities in the coming months.`,
    actionPoints: [{ description: 'Assign more leadership tasks', completed: false }],
    goals: [{ title: 'Leadership development', description: 'Take on leadership of a small project', achievedPercent: 60 }],
  },
];
