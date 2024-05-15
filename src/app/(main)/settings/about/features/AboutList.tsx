'use client';

import { Grid, Icon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import {
  Book,
  FileClock,
  Github,
  Heart,
  HeartHandshake,
  HelpCircle,
  Home,
  Lock,
  LucideBookOpenText,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import {
  ABOUT,
  CHANGELOG,
  DOCUMENTS,
  FEEDBACK,
  GITHUB,
  OFFICIAL_BLOG,
  OFFICIAL_SITE,
  PRIVACY_URL,
  SHOPPING,
  TERMS_URL,
} from '@/const/url';

const useStyles = createStyles(({ css, token, responsive, isDarkMode }) => ({
  card: css`
    cursor: pointer;

    padding: 20px;

    background: ${isDarkMode ? token.colorFillTertiary : token.colorBgContainer};
    border: 1px solid ${token.colorFillSecondary};
    border-radius: ${token.borderRadiusLG}px;

    &:hover {
      background: ${isDarkMode ? token.colorFillSecondary : token.colorBgContainer};
      border: 1px solid ${token.colorFill};
    }

    ${responsive.mobile} {
      padding: 16px;
    }
  `,
  container: css`
    ${responsive.mobile} {
      padding-inline: 16px;
    }
  `,
}));

const AboutList = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation('common');

  const items = [
    {
      href: OFFICIAL_SITE,
      icon: Home,
      label: t('officialSite'),
      value: 'officialSite',
      visible: true,
    },
    {
      href: SHOPPING,
      icon: ShoppingBag,
      label: t('shopping'),
      value: 'shopping',
      visible: true,
    },
    {
      href: DOCUMENTS,
      icon: Book,
      label: t('document'),
      value: 'document',
      visible: true,
    },
    {
      href: OFFICIAL_BLOG,
      icon: LucideBookOpenText,
      label: t('blog'),
      value: 'blog',
      visible: false,
    },
    {
      href: GITHUB,
      icon: Github,
      label: 'GitHub',
      value: 'github',
      visible: true,
    },
    {
      href: FEEDBACK,
      icon: HelpCircle,
      label: t('feedback'),
      value: 'feedback',
      visible: true,
    },
    {
      href: CHANGELOG,
      icon: FileClock,
      label: t('changelog'),
      value: 'changelog',
      visible: true,
    },
    {
      href: TERMS_URL,
      icon: HeartHandshake,
      label: t('terms'),
      value: 'terms',
      visible: false,
    },
    {
      href: PRIVACY_URL,
      icon: Lock,
      label: t('privacy'),
      value: 'privacy',
      visible: true,
    },
    {
      href: ABOUT,
      icon: Heart,
      label: t('about'),
      value: 'about',
      visible: true,
    },
  ];

  return (
    <Grid className={styles.container} maxItemWidth={144} width={'100%'}>
      {items
        .filter(({ visible }) => visible)
        .map(({ value, icon, label, href }) => (
          <Link href={href} key={value} style={{ color: 'inherit' }} target={'_blank'}>
            <Flexbox className={styles.card} gap={8} horizontal>
              <Icon icon={icon} size={{ fontSize: 20 }} />
              {label}
            </Flexbox>
          </Link>
        ))}
    </Grid>
  );
});

export default AboutList;
