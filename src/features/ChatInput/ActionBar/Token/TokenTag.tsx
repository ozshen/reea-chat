import { Tooltip } from '@lobehub/ui';
import numeral from 'numeral';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import TokenTagIner from '@/features/TokenTag';
import { useTokenCount } from '@/hooks/useTokenCount';
import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors';
import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';
import { useToolStore } from '@/store/tool';
import { toolSelectors } from '@/store/tool/selectors';
import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';

const format = (number: number) => numeral(number).format('0,0');

const TokenTag = memo(() => {
  const { t } = useTranslation('chat');

  const [input, messageString] = useChatStore((s) => [
    s.inputMessage,
    chatSelectors.chatsMessageString(s),
  ]);

  const [systemRole, model] = useAgentStore((s) => [
    agentSelectors.currentAgentSystemRole(s),
    agentSelectors.currentAgentModel(s) as string,
  ]);

  const maxTokens = useUserStore(modelProviderSelectors.modelMaxToken(model));

  // Tool usage token
  const canUseTool = useUserStore(modelProviderSelectors.isModelEnabledFunctionCall(model));
  const plugins = useAgentStore(agentSelectors.currentAgentPlugins);
  const toolsString = useToolStore((s) => {
    const pluginSystemRoles = toolSelectors.enabledSystemRoles(plugins)(s);
    const schemaNumber = toolSelectors
      .enabledSchema(plugins)(s)
      .map((i) => JSON.stringify(i))
      .join('');

    return pluginSystemRoles + schemaNumber;
  });
  const toolsToken = useTokenCount(canUseTool ? toolsString : '');

  // Chat usage token
  const inputTokenCount = useTokenCount(input);

  const chatsToken = useTokenCount(messageString) + inputTokenCount;

  // SystemRole token
  const systemRoleToken = useTokenCount(systemRole);

  // Total token
  const totalToken = systemRoleToken + toolsToken + chatsToken;
  return (
    <Tooltip
      placement={'bottom'}
      title={
        <Flexbox width={150}>
          <Flexbox horizontal justify={'space-between'}>
            <span>{t('tokenDetails.systemRole')}</span>
            <span>{format(systemRoleToken)}</span>
          </Flexbox>
          <Flexbox horizontal justify={'space-between'}>
            <span>{t('tokenDetails.tools')}</span>
            <span>{format(toolsToken)}</span>
          </Flexbox>
          <Flexbox horizontal justify={'space-between'}>
            <span>{t('tokenDetails.chats')}</span>
            <span>{format(chatsToken)}</span>
          </Flexbox>
          <Flexbox horizontal justify={'space-between'}>
            <span>{t('tokenDetails.used')}</span>
            <span>{format(totalToken)}</span>
          </Flexbox>
          <Flexbox horizontal justify={'space-between'} style={{ marginTop: 8 }}>
            <span>{t('tokenDetails.total')}</span>
            <span>{format(maxTokens)}</span>
          </Flexbox>
          <Flexbox horizontal justify={'space-between'}>
            <span>{t('tokenDetails.rest')}</span>
            <span>{format(maxTokens - totalToken)}</span>
          </Flexbox>
        </Flexbox>
      }
    >
      <TokenTagIner
        displayMode={'used'}
        maxValue={maxTokens}
        style={{ marginLeft: 8 }}
        text={{
          overload: t('tokenTag.overload'),
          remained: t('tokenTag.remained'),
          used: t('tokenTag.used'),
        }}
        value={totalToken}
      />
    </Tooltip>
  );
});

export default TokenTag;
