import { UserStore } from '@/store/user';

const useCmdEnterToSend = (s: UserStore): boolean => s.preference.useCmdEnterToSend || false;

const userAllowTrace = (s: UserStore): boolean =>
  !!s.preference.telemetry ? s.preference.telemetry : true;

const hideSyncAlert = (s: UserStore): boolean =>
  !!s.preference.hideSyncAlert ? s.preference.hideSyncAlert : false;

const isPreferenceInit = (s: UserStore) => s.isPreferenceInit;

export const preferenceSelectors = {
  hideSyncAlert,
  isPreferenceInit,
  useCmdEnterToSend,
  userAllowTrace,
};
