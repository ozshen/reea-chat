import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Menu from '@/components/Menu';
import { enableAuth } from '@/const/auth';
import SyncStatusTag from '@/features/SyncStatusInspector';
import { useUserStore } from '@/store/user';
import { authSelectors } from '@/store/user/selectors';

import DataStatistics from '../DataStatistics';
import UserInfo from '../UserInfo';
import UserLoginOrSignup from '../UserLoginOrSignup';
import LangButton from './LangButton';
import ScreenButton from './ScreenButton';
import ThemeButton from './ThemeButton';
import { useMenu } from './useMenu';

const PanelContent = memo<{ closePopover: () => void }>(({ closePopover }) => {
  const router = useRouter();
  const isLoginWithAuth = useUserStore(authSelectors.isLoginWithAuth);
  const [openSignIn, signOut, openUserProfile] = useUserStore((s) => [
    s.openLogin,
    s.logout,
    s.openUserProfile,
  ]);
  const { mainItems, logoutItems } = useMenu();

  const handleOpenProfile = () => {
    if (!enableAuth) return;
    openUserProfile();
    closePopover();
  };

  const handleSignIn = () => {
    openSignIn();
    closePopover();
  };

  const handleSignOut = () => {
    signOut();
    closePopover();
    router.push('/login');
  };

  return (
    <Flexbox gap={2} style={{ minWidth: 300 }}>
      {!enableAuth ? (
        <UserInfo />
      ) : isLoginWithAuth ? (
        <UserInfo onClick={handleOpenProfile} />
      ) : (
        <UserLoginOrSignup onClick={handleSignIn} />
      )}
      <DataStatistics />
      <Menu items={mainItems} onClick={closePopover} />
      {isLoginWithAuth && <Menu items={logoutItems} onClick={handleSignOut} />}
      <Flexbox
        align={'center'}
        horizontal
        justify={'space-between'}
        style={{ padding: '6px 6px 6px 16px' }}
      >
        <SyncStatusTag />
        <Flexbox align={'center'} flex={'none'} gap={6} horizontal>
          <ScreenButton />
          <LangButton />
          <ThemeButton />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
});

export default PanelContent;
