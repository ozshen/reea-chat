'use client';

import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { shuffle } from 'lodash-es';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import urlJoin from 'url-join';

import { useChatInput } from '@/features/ChatInput/useChatInput';

const BASE_DOC_URL = 'https://lobehub.com/docs/usage/features';

const useStyles = createStyles(({ css, token }) => ({
  card: css`
    cursor: pointer;

    padding: 12px 24px;

    color: ${token.colorText};

    background: ${token.colorBgContainer};
    border-radius: 48px;

    &:hover {
      background: ${token.colorBgElevated};
    }
  `,
  icon: css`
    color: ${token.colorTextSecondary};
  `,
  title: css`
    color: ${token.colorTextDescription};
  `,
}));

const qaqList = shuffle([
  'q01',
  'q02',
  'q03',
  'q04',
  'q05',
  'q06',
  'q07',
  'q08',
  'q09',
  'q10',
  'q11',
  'q12',
  'q13',
  'q14',
  'q15',
]);

const QuestionSuggest = memo(() => {
  const { onInput, onSend } = useChatInput();
  const { t } = useTranslation('welcome');
  const { styles } = useStyles();
  const [sliceStart, setSliceStart] = useState(0);

  const handoleSend = (qa: string) => {
    onInput(qa);
    onSend();
  };

  const cards = useMemo(
    () =>
      qaqList.slice(sliceStart, sliceStart + 5).map((item) => {
        const text = t(`guide.qa.${item}` as any);
        return (
          <Flexbox
            align={'center'}
            className={styles.card}
            gap={8}
            horizontal
            key={item}
            onClick={() => handoleSend(text)}
          >
            {t(text)}
          </Flexbox>
        );
      }),
    [qaqList, sliceStart],
  );

  const handleRefresh = () => {
    if (!qaqList) return;
    setSliceStart(Math.floor((Math.random() * qaqList.length) / 2));
  };
  return (
    <Flexbox gap={8} width={'100%'}>
      <Flexbox align={'center'} horizontal justify={'space-between'}>
        <div className={styles.title}>{t('guide.questions.title')}</div>
        <Flexbox horizontal>
          <ActionIcon
            icon={RefreshCw}
            onClick={handleRefresh}
            size={{ blockSize: 24, fontSize: 14 }}
            title={t('guide.questions.replaceBtn')}
          />
          <ActionIcon
            icon={ArrowRight}
            onClick={() => {
              window.open(urlJoin(BASE_DOC_URL, 'start'), '__blank');
            }}
            size={{ blockSize: 24, fontSize: 16 }}
            title={t('guide.questions.moreBtn')}
          />
        </Flexbox>
      </Flexbox>
      <Flexbox gap={8} horizontal wrap={'wrap'}>
        {cards}
      </Flexbox>
    </Flexbox>
  );
});

export default QuestionSuggest;
