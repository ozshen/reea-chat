import { SiAndroid, SiApple, SiWindows11 } from '@icons-pack/react-simple-icons';
import { memo } from 'react';

// TODO: 等 simple icons 修复类型，移除 ignore

const SystemIcon = memo<{ size: number; title?: string }>(({ size, title }) => {
  if (!title) return;

  // @ts-ignore
  if (['Mac OS', 'iOS'].includes(title)) return <SiApple size={size} />;

  // @ts-ignore
  if (title === 'Windows') return <SiWindows11 size={size} />;

  // @ts-ignore
  if (title === 'Android') return <SiAndroid size={size} />;

  return null;
});

export default SystemIcon;
