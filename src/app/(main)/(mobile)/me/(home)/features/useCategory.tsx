import { DiscordIcon } from '@lobehub/ui';
import { Book, CircleUserRound, Database, Download, Feather, Info, Settings2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { CellProps } from '@/components/Cell';
import { enableAuth } from '@/const/auth';
import { DISCORD, DOCUMENTS, FEEDBACK } from '@/const/url';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { SettingsTabs } from '@/store/global/initialState';
import { useUserStore } from '@/store/user';
import { authSelectors } from '@/store/user/slices/auth/selectors';

import { useCategory as useSettingsCategory } from '../../settings/features/useCategory';

export const useCategory = () => {
  const router = useRouter();
  const { canInstall, install } = usePWAInstall();
  const { t } = useTranslation(['common', 'setting', 'auth']);
  const [isLogin, isLoginWithAuth, isLoginWithClerk] = useUserStore((s) => [
    authSelectors.isLogin(s),
    authSelectors.isLoginWithAuth(s),
    authSelectors.isLoginWithClerk(s),
  ]);

  const profile: CellProps[] = [
    {
      icon: CircleUserRound,
      key: 'profile',
      label: t('userPanel.profile'),
      onClick: () => router.push('/me/profile'),
    },
  ];

  const settings: CellProps[] = [
    {
      icon: Settings2,
      key: 'setting',
      label: t('userPanel.setting'),
      onClick: () => router.push('/me/settings'),
    },
  ];

  const pwa: CellProps[] = [
    {
      type: 'divider',
    },
    {
      icon: Download,
      key: 'pwa',
      label: t('installPWA'),
      onClick: () => install(),
    },
  ];

  const settingsWithoutAuth = [...useSettingsCategory()];

  const data: CellProps[] = [
    {
      icon: Database,
      key: 'data',
      label: t('userPanel.data'),
      onClick: () => router.push('/me/data'),
    },
  ];

  const helps: CellProps[] = [
    {
      icon: Info,
      key: SettingsTabs.About,
      label: t('about'),
      visible: true,
    },
    {
      icon: Book,
      key: 'docs',
      label: t('document'),
      onClick: () => window.open(DOCUMENTS, '__blank'),
      visible: false,
    },
    {
      icon: Feather,
      key: 'feedback',
      label: t('feedback'),
      onClick: () => window.open(FEEDBACK, '__blank'),
      visible: false,
    },
    {
      icon: DiscordIcon,
      key: 'discord',
      label: 'Discord',
      onClick: () => window.open(DISCORD, '__blank'),
      visible: false,
    },
  ].filter((s) => s.visible);

  const mainItems = [
    ...(isLoginWithClerk ? profile : []),
    ...(enableAuth ? (isLoginWithAuth ? settings : []) : settingsWithoutAuth),
    ...(isLogin ? data : []),
    ...helps,
    ...(canInstall ? pwa : []),
  ].filter(Boolean) as CellProps[];

  return mainItems;
};
