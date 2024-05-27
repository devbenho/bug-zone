import fs from 'fs';
import path from 'path';
import { pino } from 'pino';
import pretty from 'pino-pretty';
import { AppConfig } from './config';

const streams: { write: any }[] = [
  process.env.ENV === 'production' ? process.stdout : pretty(),
  fs.createWriteStream(path.join(AppConfig.LOGGER_PATH, 'process.log')),
];

export const LOGGER = pino(
  {
    redact: ['body.password'],
    formatters: {
      bindings: () => ({}),
    },
  },
  pino.multistream(streams),
);
