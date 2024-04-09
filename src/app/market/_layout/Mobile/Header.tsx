'use client';

import { MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { mobileHeaderSticky } from '@/styles/mobileHeader';

import ShareAgentButton from '../../features/ShareAgentButton';

const Header = memo(() => {
  return (
    <MobileNavBar
      center={
        // <Logo type={'text'} />
        <Flexbox align={'center'} flex={1} style={{ fontSize: 18, fontWeight: 600, padding: 16 }}>
          Assistants
        </Flexbox>
      }
      right={<ShareAgentButton mobile />}
      style={mobileHeaderSticky}
    />
  );
});

export default Header;
