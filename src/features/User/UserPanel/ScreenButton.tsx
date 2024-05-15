import { ActionIcon } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { Maximize } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ScreenButton = memo(() => {
  const theme = useTheme();

  const { t } = useTranslation(['common']);

  return (
    <ActionIcon
      icon={Maximize}
      size={{ blockSize: 32, fontSize: 16 }}
      style={{ border: `1px solid ${theme.colorFillSecondary}` }}
      title={t('fullscreen')}
    />
  );
});

export default ScreenButton;
