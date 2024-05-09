'use client';

import { Icon } from '@lobehub/ui';
import { Button } from 'antd';
import { SendHorizonal, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useGlobalStore } from '@/store/global';

import Hero from './Hero';
import { useStyles } from './style';

const Banner = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { t } = useTranslation('welcome');
  const router = useRouter();
  const { styles } = useStyles();
  const [switchBackToChat, isMobile] = useGlobalStore((s) => [s.switchBackToChat, s.isMobile]);

  return (
    <>
      <div className={styles.container}>
        <Hero mobile={mobile} width={mobile ? 640 : 1024} />
      </div>
      <Flexbox
        className={styles.buttonGroup}
        gap={16}
        horizontal={!mobile}
        justify={'center'}
        width={'100%'}
      >
        <Button
          block={mobile}
          onClick={() => router.push('/market')}
          size={'large'}
          type={'default'}
        >
          <Flexbox align={'center'} gap={4} horizontal justify={'center'}>
            {t('button.market')}
            <Icon icon={ShoppingCart} />
          </Flexbox>
        </Button>
        <Button
          block={mobile}
          onClick={() => (isMobile ? router.push('/chat') : switchBackToChat())}
          size={'large'}
          type={'default'}
        >
          <Flexbox align={'center'} gap={4} horizontal justify={'center'}>
            {t('button.start')}
            <Icon icon={SendHorizonal} />
          </Flexbox>
        </Button>
      </Flexbox>
    </>
  );
});

export default Banner;
