import { OPENAI_API_KEY } from '@/config';
import { MeetingNote } from '@/interfaces/meetingNotes.interface';
import { MeetingNoteModel } from '@/models/meetingNotes.model';
import { systemPrompt } from '@/prompt/systemPrompt';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { Service } from 'typedi';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Service()
export class AgendaService {
  public async suggestAgenda(): Promise<MeetingNote[]> {
    const meetingNotes: MeetingNote[] = MeetingNoteModel;
    const model = new ChatOpenAI({ model: 'gpt-4', apiKey: OPENAI_API_KEY });

    const humanMessage = new HumanMessage(meetingNotes.map(note => note.notes).join(';'));

    const messages = [new SystemMessage(systemPrompt), humanMessage];

    const result = await model.invoke(messages);
    const parser = new StringOutputParser(result);

    console.log(await parser.invoke(result));

    return meetingNotes;
  }
}
