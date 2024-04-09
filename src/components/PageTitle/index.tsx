import { memo, useEffect } from 'react';

const PageTitle = memo<{ title: string }>(({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} · ChatAI` : 'ChatAI';
  }, [title]);

  return null;
});

export default PageTitle;
