import { Gemini, Google } from '@lobehub/icons';
import { Divider } from 'antd';
import { useTheme } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ModelProvider } from '@/libs/agent-runtime';

import ProviderConfig from '../components/ProviderConfig';

const GoogleProvider = memo(() => {
  const theme = useTheme();

  return (
    <ProviderConfig
      checkModel={'gemini-pro'}
      provider={ModelProvider.Google}
      showEndpoint
      title={
        <Flexbox align={'center'} gap={8} horizontal>
          <Google.BrandColor
            color={theme.isDarkMode ? theme.colorText : Google.colorPrimary}
            size={28}
          />
          <Divider style={{ margin: '0 4px' }} type={'vertical'} />
          <Gemini.Combine
            color={theme.isDarkMode ? theme.colorText : Gemini.colorPrimary}
            size={24}
            type={'color'}
          />
        </Flexbox>
      }
    />
  );
});

export default GoogleProvider;
