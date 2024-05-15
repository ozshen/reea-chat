'use client';

import { SiDiscord, SiGitbook, SiGithub, SiShopify } from '@icons-pack/react-simple-icons';
import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import Link from 'next/link';
import { memo } from 'react';
// import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DISCORD, DOCUMENTS, GITHUB, SHOPPING } from '@/const/url';

const useStyles = createStyles(({ css, token }) => {
  return {
    icon: css`
      svg {
        fill: ${token.colorTextDescription};
      }

      &:hover {
        svg {
          fill: ${token.colorText};
        }
      }
    `,
  };
});

const Follow = memo(() => {
  const { styles } = useStyles();
  // const { t } = useTranslation('common');
  return (
    <Flexbox gap={8} horizontal>
      <Link href={GITHUB} rel="noreferrer" target={'_blank'}>
        <ActionIcon
          className={styles.icon}
          icon={SiGithub as any}
          // title={t('follow', { name: 'GitHub' })}
        />
      </Link>
      <Link href={DOCUMENTS} rel="noreferrer" target={'_blank'}>
        <ActionIcon
          className={styles.icon}
          icon={SiGitbook as any}
          // title={t('follow', { name: 'X' })}
        />
      </Link>
      <Link href={DISCORD} rel="noreferrer" target={'_blank'}>
        <ActionIcon
          className={styles.icon}
          icon={SiDiscord as any}
          // title={t('follow', { name: 'Discord' })}
        />
      </Link>
      <Link href={SHOPPING} rel="noreferrer" target={'_blank'}>
        <ActionIcon
          className={styles.icon}
          icon={SiShopify as any}
          // title={t('follow', { name: 'Medium' })}
        />
      </Link>
    </Flexbox>
  );
});

Follow.displayName = 'Follow';

export default Follow;
