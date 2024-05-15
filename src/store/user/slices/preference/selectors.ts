import { UserStore } from '@/store/user';

const useCmdEnterToSend = (s: UserStore): boolean => s.preference.useCmdEnterToSend || false;

const userAllowTrace = (s: UserStore): boolean =>
  !!s.preference.telemetry ? s.preference.telemetry : true;

const hideSyncAlert = (s: UserStore): boolean =>
  !!s.preference.hideSyncAlert ? s.preference.hideSyncAlert : false;

const hideSettingsMoveGuide = (s: UserStore) => s.preference.guide?.moveSettingsToAvatar;

const isPreferenceInit = (s: UserStore) => s.isPreferenceInit;

export const preferenceSelectors = {
  hideSettingsMoveGuide,
  hideSyncAlert,
  isPreferenceInit,
  useCmdEnterToSend,
  userAllowTrace,
};
