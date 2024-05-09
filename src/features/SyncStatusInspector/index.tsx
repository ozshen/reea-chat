import { TooltipPlacement } from 'antd/es/tooltip';
import { memo } from 'react';

import { useUserStore } from '@/store/user';

import DisableSync from './DisableSync';
import EnableSync from './EnableSync';

interface SyncStatusTagProps {
  hiddenActions?: boolean;
  hiddenDisableSync?: boolean;
  hiddenEnableGuide?: boolean;
  placement?: TooltipPlacement;
}

const SyncStatusTag = memo<SyncStatusTagProps>(
  ({ hiddenActions, hiddenDisableSync, hiddenEnableGuide, placement }) => {
    const [enableSync] = useUserStore((s) => [s.syncEnabled]);

    return enableSync ? (
      <EnableSync hiddenActions={hiddenActions} placement={placement} />
    ) : (
      !hiddenDisableSync && <DisableSync noPopover={hiddenEnableGuide} placement={placement} />
    );
  },
);

export default SyncStatusTag;
