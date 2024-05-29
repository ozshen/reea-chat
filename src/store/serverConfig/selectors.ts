import { mapFeatureFlagsEnvToState } from '@/config/featureFlags';

import { ServerConfigStore } from './store';

export const featureFlagsSelectors = (s: ServerConfigStore) =>
  mapFeatureFlagsEnvToState(s.featureFlags);

export const serverConfigSelectors = {
  enableUploadFileToServer: (s: ServerConfigStore) => !!s.serverConfig?.enableUploadFileToServer,
  enabledAccessCode: (s: ServerConfigStore) => !!s.serverConfig?.enabledAccessCode,
  enabledOAuthSSO: (s: ServerConfigStore) => !!s.serverConfig?.enabledOAuthSSO,
  enabledTelemetryChat: (s: ServerConfigStore) => !!s.serverConfig?.telemetry?.langfuse,
  isMobile: (s: ServerConfigStore) => s.isMobile || false,
};
