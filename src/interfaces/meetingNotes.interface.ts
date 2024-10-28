export interface ActionPoint {
  description: string;
  completed: boolean;
}

export interface Goal {
  title: string;
  description: string;
  achievedPercent: number;
}

export interface MeetingNote {
  id: number;
  notes: string;
  actionPoints?: ActionPoint[];
  goals?: Goal[];
}
