import { OPENAI_API_KEY, OPENAI_DEFAULT_MODEL } from '@/config';
import { Agenda } from '@/interfaces/agenda.interface';
import { MeetingNote } from '@/interfaces/meetingNotes.interface';
import { systemPrompt } from '@/prompts/system.prompt';
import { agendaSchema } from '@/schemas/agenda.schema';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { Service } from 'typedi';

/**
 * Suggests an agenda based on the given meeting notes and optional model.
 * @param {MeetingNote[]} meetingNotesData - The meeting notes data to analyze for agenda suggestions.
 * @param {string} [openAIModel] - (Optional) The OpenAI model to use for generating the agenda. Otherwise uses the default model.
 * @returns {Promise<Agenda>} - A promise that resolves to the suggested agenda.
 */
@Service()
export class AgendaService {
  public async suggestAgenda(meetingNotesData: MeetingNote[], openAIModel?: string): Promise<Agenda> {
    const model = new ChatOpenAI({ model: openAIModel || OPENAI_DEFAULT_MODEL, apiKey: OPENAI_API_KEY });
    const structuredModel = model.withStructuredOutput(agendaSchema);

    const humanMessageContent = this.formatHumanMessageContent(meetingNotesData);
    const messages = [new SystemMessage(systemPrompt), new HumanMessage(humanMessageContent)];

    const structuredResponse = await structuredModel.invoke(messages);
    return structuredResponse;
  }

  /**
   * Formats the human message content based on provided meeting notes.
   * @param {MeetingNote[]} meetingNotesData - The meeting notes data to format into a human message.
   * @returns {string} - The formatted human message content.
   */
  private formatHumanMessageContent(meetingNotesData: MeetingNote[]): string {
    return meetingNotesData
      .map(note => {
        const actionPoints = note.actionPoints?.map(ap => `- ${ap.description} (${ap.completed ? 'Completed' : 'Pending'})`).join('\n');
        const goals = note.goals?.map(goal => `- ${goal.title}: ${goal.description} (${goal.achievedPercent}% achieved)`).join('\n');
        return `Meeting Notes: ${note.notes}\nAction Points:\n${actionPoints}\nGoals:\n${goals}`;
      })
      .join('\n\n');
  }
}
