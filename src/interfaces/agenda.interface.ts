interface SuggestedTopic {
  topic: string;
  details: string;
  motivationFactors: string[];
  leadershipApproach?: string;
}

export interface Agenda {
  agenda: SuggestedTopic[];
  additionalNotes?: string;
}
