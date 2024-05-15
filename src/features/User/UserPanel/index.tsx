'use client';

import { Popover } from 'antd';
import { createStyles } from 'antd-style';
import { PropsWithChildren, memo, useState } from 'react';

import { useNewVersion } from '@/hooks/useNewVersion';

import PanelContent from './PanelContent';
import UpgradeBadge from './UpgradeBadge';

const useStyles = createStyles(({ css }) => ({
  popover: css`
    top: 8px !important;
    left: 8px !important;
  `,
}));

const UserPanel = memo<PropsWithChildren>(({ children }) => {
  const hasNewVersion = useNewVersion();
  const [open, setOpen] = useState(false);
  const { styles } = useStyles();

  return (
    <UpgradeBadge showBadge={hasNewVersion}>
      <Popover
        arrow={false}
        content={<PanelContent closePopover={() => setOpen(false)} />}
        onOpenChange={setOpen}
        open={open}
        overlayInnerStyle={{ padding: 0 }}
        placement={'topRight'}
        rootClassName={styles.popover}
        trigger={['click']}
      >
        {children}
      </Popover>
    </UpgradeBadge>
  );
});

UserPanel.displayName = 'UserPanel';

export default UserPanel;
