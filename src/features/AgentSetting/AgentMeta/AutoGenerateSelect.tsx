import { ActionIcon } from '@lobehub/ui';
import { Select, SelectProps } from 'antd';
import { useTheme } from 'antd-style';
import { isString } from 'lodash-es';
import { Wand2 } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export interface AutoGenerateInputProps extends SelectProps {
  autoGen?: boolean;
  loading?: boolean;
  onGenerate?: () => void;
}

const AutoGenerateSelect = memo<AutoGenerateInputProps>(
  ({ loading, onGenerate, value, autoGen, ...props }) => {
    const { t } = useTranslation('common');
    const theme = useTheme();

    return (
      <Select
        mode="tags"
        open={false}
        style={{ width: '100%' }}
        suffixIcon={
          onGenerate && (
            <ActionIcon
              active
              disable={!autoGen}
              icon={Wand2}
              loading={loading}
              onClick={onGenerate}
              size={'small'}
              style={{
                color: theme.colorInfo,
                marginRight: -4,
              }}
              title={!autoGen ? t('autoGenerateTooltipDisabled') : t('autoGenerate')}
            />
          )
        }
        tokenSeparators={[',', '，', ' ']}
        value={isString(value) ? value.split(',') : value}
        {...props}
      />
    );
  },
);

export default AutoGenerateSelect;
