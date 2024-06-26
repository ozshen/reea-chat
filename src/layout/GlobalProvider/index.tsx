import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { FC, ReactNode } from 'react';

import { getClientConfig } from '@/config/client';
import { getServerFeatureFlagsValue } from '@/config/server/featureFlags';
import { LOCALE_COOKIE } from '@/const/locale';
import { THEME_APPEARANCE, THEME_NEUTRAL_COLOR, THEME_PRIMARY_COLOR } from '@/const/theme';
import { getServerGlobalConfig } from '@/server/globalConfig';
import { ServerConfigStoreProvider } from '@/store/serverConfig';
import { getAntdLocale } from '@/utils/locale';
import { isMobileDevice } from '@/utils/responsive';

import AppTheme from './AppTheme';
import Locale from './Locale';
import StoreInitialization from './StoreInitialization';
import StyleRegistry from './StyleRegistry';

let DebugUI: FC = () => null;

// we need use Constant Folding to remove code below in production
// refs: https://webpack.js.org/plugins/internal-plugins/#constplugin
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line unicorn/no-lonely-if
  if (getClientConfig().DEBUG_MODE) {
    DebugUI = dynamic(() => import('@/features/DebugUI'), { ssr: false }) as FC;
  }
}

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout = async ({ children }: GlobalLayoutProps) => {
  // get default theme config to use with ssr
  const cookieStore = cookies();
  const appearance = cookieStore.get(THEME_APPEARANCE);
  const neutralColor = cookieStore.get(THEME_NEUTRAL_COLOR);
  const primaryColor = cookieStore.get(THEME_PRIMARY_COLOR);

  // get default locale config to use with ssr
  const defaultLang = cookieStore.get(LOCALE_COOKIE);
  const antdLocale = await getAntdLocale(defaultLang?.value);

  // get default feature flags to use with ssr
  const serverFeatureFlags = getServerFeatureFlagsValue();
  const serverConfig = getServerGlobalConfig();
  const isMobile = isMobileDevice();
  return (
    <StyleRegistry>
      <Locale antdLocale={antdLocale} defaultLang={defaultLang?.value}>
        <AppTheme
          defaultAppearance={appearance?.value}
          defaultNeutralColor={neutralColor?.value as any}
          defaultPrimaryColor={primaryColor?.value as any}
        >
          <StoreInitialization />
          <ServerConfigStoreProvider
            featureFlags={serverFeatureFlags}
            isMobile={isMobile}
            serverConfig={serverConfig}
          >
            {children}
          </ServerConfigStoreProvider>
          <DebugUI />
        </AppTheme>
      </Locale>
    </StyleRegistry>
  );
};

export default GlobalLayout;
