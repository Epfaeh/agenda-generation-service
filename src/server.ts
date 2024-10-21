import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { AgendaRoute } from './routes/agenda.route';

ValidateEnv();

const app = new App([new AgendaRoute()]);

app.listen();
