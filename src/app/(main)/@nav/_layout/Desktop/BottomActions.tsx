import { ActionIcon } from '@lobehub/ui';
import { Book } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import AdsButton from '@/components/AdsModal';
import { DOCUMENTS } from '@/const/url';

const BottomActions = memo(() => {
  const { t } = useTranslation('common');

  return (
    <>
      <Link aria-label={t('document')} href={DOCUMENTS} target={'_blank'}>
        <ActionIcon icon={Book} placement={'right'} size={'large'} title={t('document')} />
      </Link>
      <AdsButton />
    </>
  );
});

export default BottomActions;
