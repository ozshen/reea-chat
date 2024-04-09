import { z } from 'zod';

export type DBModel<T> = T & {
  createdAt: number;
  id: string;
  updatedAt: number;
};

export const DBBaseFieldsSchema = z.object({
  createdAt: z.number(),
  id: z.string(),
  updatedAt: z.number(),
});

export const CHAT_LOCAL_DB_NAME = 'REEA_CHAT_DB';
