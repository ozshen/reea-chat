import { CHAT_ACCESS_CODE, OPENAI_END_POINT, OPENAI_KEY_HEADER } from '@/const/fetch';
import { useUserStore } from '@/store/user';
import { modelConfigSelectors, settingsSelectors } from '@/store/user/selectors';

// TODO: Need to be removed after tts refactor
// eslint-disable-next-line no-undef
export const createHeaderWithOpenAI = (header?: HeadersInit): HeadersInit => {
  const openai = modelConfigSelectors.openAIConfig(useUserStore.getState());

  const apiKey = openai.apiKey || '';
  const endpoint = openai.endpoint || '';

  // eslint-disable-next-line no-undef
  return {
    ...header,
    [CHAT_ACCESS_CODE]: settingsSelectors.password(useUserStore.getState()),
    [OPENAI_END_POINT]: endpoint,
    [OPENAI_KEY_HEADER]: apiKey,
  };
};
