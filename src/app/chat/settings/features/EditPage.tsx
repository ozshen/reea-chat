'use client';

import isEqual from 'fast-deep-equal';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Agent from '@/app/settings/agent/Agent';
import PageTitle from '@/components/PageTitle';
import { INBOX_SESSION_ID } from '@/const/session';
import AgentSetting from '@/features/AgentSetting';
import { useSessionStore } from '@/store/session';
import { agentSelectors } from '@/store/session/selectors';

const EditPage = memo(() => {
  const { t } = useTranslation('setting');
  const id = useSessionStore((s) => s.activeId);
  const config = useSessionStore(agentSelectors.currentAgentConfig, isEqual);
  const meta = useSessionStore(agentSelectors.currentAgentMeta, isEqual);
  const [updateAgentConfig, updateAgentMeta, title] = useSessionStore((s) => [
    s.updateAgentConfig,
    s.updateAgentMeta,
    agentSelectors.currentAgentTitle(s),
  ]);

  return (
    <>
      <PageTitle title={t('header.sessionWithName', { name: title })} />
      {id === INBOX_SESSION_ID ? (
        <Agent />
      ) : (
        <AgentSetting
          config={config}
          id={id}
          meta={meta}
          onConfigChange={updateAgentConfig}
          onMetaChange={updateAgentMeta}
        />
      )}
    </>
  );
});

export default EditPage;
