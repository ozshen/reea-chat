import { PersistOptions, devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import type { StateCreator } from 'zustand/vanilla';

import { createHyperStorage } from '@/store/middleware/createHyperStorage';
import { isDev } from '@/utils/env';

import { type StoreAction, createMarketAction } from './action';
import { type StoreState, initialState } from './initialState';

export type Store = StoreAction & StoreState;

const AGENT_MARKET = 'REEA_AGENT_MARKET';

const persistOptions: PersistOptions<Store> = {
  name: AGENT_MARKET,

  skipHydration: true,

  storage: createHyperStorage({
    localStorage: {
      dbName: 'ReeaChat',
      selectors: ['agentMap'],
    },
    url: {
      mode: 'search',
      selectors: [
        // map state key to storage key
        { currentIdentifier: 'agent' },
      ],
    },
  }),

  version: 0,
};

const createStore: StateCreator<Store, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createMarketAction(...parameters),
});

export const useMarketStore = createWithEqualityFn<Store>()(
  persist(
    devtools(createStore, {
      name: AGENT_MARKET + (isDev ? '_DEV' : ''),
    }),
    persistOptions,
  ),
  shallow,
);
