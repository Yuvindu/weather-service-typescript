import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/create.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'city',
        request: {
            schemas: {
                'application/json': schema,
            }
        }
      },
    },
  ],
};
