import config from 'config';
import { dbConfig } from '@interfaces/db.interface';

const { username, password, host, port, database }: dbConfig = config.get('dbConfig');

export const dbConnection = {
  url: `mongodb://${username}:${password}@${host}:${port}/${database}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
