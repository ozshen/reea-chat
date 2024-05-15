import qs from 'query-string';
import urlJoin from 'url-join';

import { getClientConfig } from '@/config/client';
import { withBasePath } from '@/utils/basePath';

import pkg from '../../package.json';
import { INBOX_SESSION_ID } from './session';

export const OFFICIAL_URL = 'https://chat-preview.lobehub.com/';
export const OFFICIAL_SITE = 'https://lobehub.com/';
export const OFFICIAL_BLOG = urlJoin(OFFICIAL_SITE, 'blog');
export const DOCKER_IMAGE = 'https://hub.docker.com/r/lobehub/lobe-chat';
export const EMAIL_SUPPORT = 'support@lobehub.com';
export const EMAIL_BUSINESS = 'hello@lobehub.com';

export const getCanonicalUrl = (path: string) => urlJoin(OFFICIAL_URL, path);

export const GITHUB = pkg.homepage;
export const GITHUB_ISSUES = urlJoin(GITHUB, 'issues/new');

export const { ABOUT_URL, DOCS_URL, SHOP_URL, CHANGELOG_URL, PRIVACY_URL } = getClientConfig();

export const TERMS_URL = urlJoin(OFFICIAL_SITE, '/terms');

export const BLOG = urlJoin(OFFICIAL_SITE, 'blog');
export const ABOUT = !!ABOUT_URL ? ABOUT_URL : GITHUB;
export const FEEDBACK = pkg.bugs.url;
export const DISCORD = 'https://discord.gg/AYFPHvv2jT';
export const SHOPPING = !!SHOP_URL ? SHOP_URL : '';
export const DOCUMENTS = !!DOCS_URL ? DOCS_URL : 'https://chat-docs.lobehub.com';
export const DOCUMENTS_USAGE = urlJoin(DOCUMENTS, '/usage');
export const DOCUMENTS_SELFHOST = urlJoin(DOCUMENTS, '/self-hosting');

export const CHANGELOG = !!CHANGELOG_URL
  ? CHANGELOG_URL
  : urlJoin(GITHUB, 'blob/main/CHANGELOG.md');
export const RELEASES_URL = 'https://chat-preview.lobehub.com/';

export const WIKI = urlJoin(GITHUB, 'wiki');
export const WIKI_PLUGIN_GUIDE = urlJoin(DOCUMENTS_USAGE, '/plugins/development');
export const MANUAL_UPGRADE_URL = urlJoin(DOCUMENTS_SELFHOST, '/advanced/upstream-sync');

export const AGENTS_INDEX_URL = 'https://chat-agents.lobehub.com';
export const PLUGINS_INDEX_URL = 'https://chat-plugins.lobehub.com';

export const MORE_MODEL_PROVIDER_REQUEST_URL =
  'https://github.com/lobehub/lobe-chat/discussions/1284';

export const AGENTS_INDEX_GITHUB = 'https://github.com/lobehub/lobe-chat-agents';
export const AGENTS_INDEX_GITHUB_ISSUE = urlJoin(AGENTS_INDEX_GITHUB, 'issues/new');

export const SESSION_CHAT_URL = (id: string = INBOX_SESSION_ID, mobile?: boolean) =>
  qs.stringifyUrl({
    query: mobile ? { session: id, showMobileWorkspace: mobile } : { session: id },
    url: '/chat',
  });

export const imageUrl = (filename: string) => withBasePath(`/images/${filename}`);

export const LOBE_URL_IMPORT_NAME = 'settings';
