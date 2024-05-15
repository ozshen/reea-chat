'use client';

import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { shuffle } from 'lodash-es';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DOCUMENTS_USAGE } from '@/const/url';
import { useSendMessage } from '@/features/ChatInput/useSend';
import { useChatStore } from '@/store/chat';

const useStyles = createStyles(({ css, token, responsive }) => ({
  card: css`
    cursor: pointer;

    padding: 12px 24px;

    color: ${token.colorText};

    background: ${token.colorBgContainer};
    border-radius: 48px;

    &:hover {
      background: ${token.colorBgElevated};
    }

    ${responsive.mobile} {
      padding: 8px 16px;
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

const QuestionSuggest = memo<{ mobile?: boolean }>(({ mobile }) => {
  const [updateInputMessage] = useChatStore((s) => [s.updateInputMessage]);

  const { t } = useTranslation('welcome');
  const { styles } = useStyles();
  const sendMessage = useSendMessage();
  const [sliceStart, setSliceStart] = useState(0);
  const qaqLength = mobile ? 2 : 4;

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
              window.open(DOCUMENTS_USAGE, '__blank');
            }}
            size={{ blockSize: 24, fontSize: 16 }}
            title={t('guide.questions.moreBtn')}
          />
        </Flexbox>
      </Flexbox>
      <Flexbox gap={8} horizontal wrap={'wrap'}>
        {qaqList &&
          qaqList.slice(sliceStart, sliceStart + qaqLength).map((item) => {
            const text = t(`guide.qa.${item}` as any);
            return (
              <Flexbox
                align={'center'}
                className={styles.card}
                gap={8}
                horizontal
                key={item}
                onClick={() => {
                  updateInputMessage(text);
                  sendMessage({ isWelcomeQuestion: true });
                }}
              >
                {t(text)}
              </Flexbox>
            );
          })}
      </Flexbox>
    </Flexbox>
  );
});

export default QuestionSuggest;
