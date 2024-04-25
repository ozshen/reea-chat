'use client';

import { ActionIcon, Avatar, Grid, Modal } from '@lobehub/ui';
import { Skeleton, Typography } from 'antd';
import { createStyles } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import AgentInfo from '@/app/market/features/AgentDetailContent';
import { agentMarketSelectors, useMarketStore } from '@/store/market';

const { Paragraph } = Typography;

const useStyles = createStyles(({ css, token }) => ({
  card: css`
    cursor: pointer;

    position: relative;

    height: 100%;
    padding: 16px;

    color: ${token.colorText};

    background: ${token.colorBgContainer};
    border-radius: ${token.borderRadius}px;

    &:hover {
      background: ${token.colorBgElevated};
    }
  `,
  cardDesc: css`
    margin-block: 0 !important;
    color: ${token.colorTextDescription};
  `,
  cardTitle: css`
    margin-block: 0 !important;
    font-size: 16px;
    font-weight: bold;
  `,
  icon: css`
    color: ${token.colorTextSecondary};
  `,
  title: css`
    color: ${token.colorTextDescription};
  `,
}));

const AgentsSuggest = memo(() => {
  const { t } = useTranslation('welcome');
  const router = useRouter();
  const [sliceStart, setSliceStart] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onActivateAgent, onDeactivateAgent, useFetchAgentList] = useMarketStore((s) => [
    s.activateAgent,
    s.deactivateAgent,
    s.useFetchAgentList,
  ]);
  const { isLoading } = useFetchAgentList();
  const agentList = useMarketStore((s) => agentMarketSelectors.getAgentList(s), isEqual);
  const { styles } = useStyles();

  const loadingCards = Array.from({ length: 4 }).map((_, index) => (
    <Flexbox className={styles.card} key={index}>
      <Skeleton active avatar paragraph={{ rows: 2 }} title={false} />
    </Flexbox>
  ));

  const handleRefresh = () => {
    if (!agentList) return;
    setSliceStart(Math.floor((Math.random() * agentList.length) / 2));
  };

  const cards = useMemo(
    () =>
      agentList.slice(sliceStart, sliceStart + 4).map((agent) => (
        <Flexbox
          className={styles.card}
          gap={8}
          horizontal
          key={agent.identifier}
          onClick={() => {
            onActivateAgent(agent.identifier);
            setIsModalOpen(true);
          }}
        >
          <Avatar avatar={agent.meta.avatar} style={{ flex: 'none' }} />
          <Flexbox gap={8}>
            <Paragraph className={styles.cardTitle} ellipsis={{ rows: 1 }}>
              {agent.meta.title}
            </Paragraph>
            <Paragraph className={styles.cardDesc} ellipsis={{ rows: 2 }}>
              {agent.meta.description}
            </Paragraph>
          </Flexbox>
        </Flexbox>
      )),
    [agentList, sliceStart],
  );

  return (
    <Flexbox gap={8} width={'100%'}>
      <Flexbox align={'center'} horizontal justify={'space-between'}>
        <div className={styles.title}>{t('guide.agents.title')}</div>
        <Flexbox horizontal>
          <ActionIcon
            icon={RefreshCw}
            onClick={handleRefresh}
            size={{ blockSize: 24, fontSize: 14 }}
            title={t('guide.agents.replaceBtn')}
          />
          <ActionIcon
            icon={ArrowRight}
            onClick={() => router.push('/market')}
            size={{ blockSize: 24, fontSize: 16 }}
            title={t('guide.agents.moreBtn')}
          />
        </Flexbox>
      </Flexbox>
      <Grid gap={8} rows={2}>
        {isLoading ? loadingCards : cards}
      </Grid>
      <Modal
        allowFullscreen
        footer={null}
        onCancel={() => {
          onDeactivateAgent();
          onActivateAgent('');
          setIsModalOpen(false);
        }}
        open={isModalOpen}
      >
        <AgentInfo />
      </Modal>
    </Flexbox>
  );
});

export default AgentsSuggest;
