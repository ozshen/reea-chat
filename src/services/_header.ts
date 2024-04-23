import { CHAT_ACCESS_CODE, OPENAI_END_POINT, OPENAI_KEY_HEADER } from '@/const/fetch';
import { useGlobalStore } from '@/store/global';
import { modelConfigSelectors, settingsSelectors } from '@/store/global/selectors';

/**
 * TODO: Need to be removed after tts refactor
 * @deprecated
 */
// eslint-disable-next-line no-undef
export const createHeaderWithOpenAI = (header?: HeadersInit): HeadersInit => {
  const openAIConfig = modelConfigSelectors.openAIConfig(useGlobalStore.getState());

  // eslint-disable-next-line no-undef
  return {
    ...header,
    [CHAT_ACCESS_CODE]: settingsSelectors.password(useGlobalStore.getState()),
    [OPENAI_END_POINT]: openAIConfig.endpoint || '',
    [OPENAI_KEY_HEADER]: openAIConfig.apiKey || '',
  };
};
