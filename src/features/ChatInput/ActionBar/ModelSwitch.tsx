import { ActionIcon } from '@lobehub/ui';
import { BotIcon } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ModelSwitchPanel from '@/features/ModelSwitchPanel';

const ModelSwitch = memo(() => {
  const { t } = useTranslation('chat');

  return (
    <ModelSwitchPanel>
      <ActionIcon icon={BotIcon} placement={'bottom'} title={t('ModelSwitch.title')} />
    </ModelSwitchPanel>
  );
});

export default ModelSwitch;
