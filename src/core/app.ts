import fastify from 'fastify';
import { handleError } from './errors/handleError';
import { registerMiddlewares } from './middlewares/register';

export const app = fastify();

registerMiddlewares(app);

app.setErrorHandler(handleError);
