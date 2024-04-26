import { GlobalStore } from '@/store/global';
import { SessionDefaultGroup } from '@/types/session';

const sessionGroupKeys = (s: GlobalStore): string[] =>
  s.preference.expandSessionGroupKeys || [SessionDefaultGroup.Pinned, SessionDefaultGroup.Default];

const useCmdEnterToSend = (s: GlobalStore): boolean =>
  !!s.preference.useCmdEnterToSend ? s.preference.useCmdEnterToSend : false;

const userAllowTrace = (s: GlobalStore): boolean =>
  !!s.preference.telemetry ? s.preference.telemetry : false;

const hideSyncAlert = (s: GlobalStore): boolean =>
  !!s.preference.hideSyncAlert ? s.preference.hideSyncAlert : false;

export const preferenceSelectors = {
  hideSyncAlert,
  sessionGroupKeys,
  useCmdEnterToSend,
  userAllowTrace,
};
