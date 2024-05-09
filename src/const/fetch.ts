export const OPENAI_END_POINT = 'X-openai-end-point';
export const OPENAI_KEY_HEADER = 'X-openai-api-key';

export const USE_AZURE_OPENAI = 'X-use-azure-openai';

export const AZURE_OPENAI_API_VERSION = 'X-azure-openai-api-version';

export const CHAT_ACCESS_CODE = 'X-reea-chat-access-code';

export const OAUTH_AUTHORIZED = 'X-oauth-authorized';

/**
 * @deprecated
 */
export const getOpenAIAuthFromRequest = (req: Request) => {
  const apiKey = req.headers.get(OPENAI_KEY_HEADER);
  const endpoint = req.headers.get(OPENAI_END_POINT);
  const accessCode = req.headers.get(CHAT_ACCESS_CODE);
  const useAzureStr = req.headers.get(USE_AZURE_OPENAI);
  const apiVersion = req.headers.get(AZURE_OPENAI_API_VERSION);
  const oauthAuthorizedStr = req.headers.get(OAUTH_AUTHORIZED);

  const oauthAuthorized = !!oauthAuthorizedStr;
  const useAzure = !!useAzureStr;

  return { accessCode, apiKey, apiVersion, endpoint, oauthAuthorized, useAzure };
};
