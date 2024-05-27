import { ActionIcon } from '@lobehub/ui';
import { Book, Github } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import AdsButton from '@/components/AdsModal';
import { DOCUMENTS, GITHUB } from '@/const/url';

const BottomActions = memo(() => {
  const { t } = useTranslation('common');

  return (
    <>
      <AdsButton />
      <Link aria-label={'GitHub'} href={GITHUB} target={'_blank'}>
        <ActionIcon icon={Github} placement={'right'} size={'large'} title={'GitHub'} />
      </Link>
      <Link aria-label={t('document')} href={DOCUMENTS} target={'_blank'}>
        <ActionIcon icon={Book} placement={'right'} size={'large'} title={t('document')} />
      </Link>
    </>
  );
});

export default BottomActions;
