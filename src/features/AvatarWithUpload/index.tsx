'use client';

import { Upload } from 'antd';
import { createStyles } from 'antd-style';
import NextImage from 'next/image';
import { CSSProperties, memo, useCallback } from 'react';

import { DEFAULT_USER_AVATAR_URL } from '@/const/meta';
import { useUserStore } from '@/store/user';
import { commonSelectors } from '@/store/user/selectors';
import { imageToBase64 } from '@/utils/imageToBase64';
import { createUploadImageHandler } from '@/utils/uploadFIle';

const useStyle = createStyles(
  ({ css, token }) => css`
    cursor: pointer;
    overflow: hidden;
    border-radius: 50%;
    transition:
      scale 400ms ${token.motionEaseOut},
      box-shadow 100ms ${token.motionEaseOut};

    &:hover {
      box-shadow: 0 0 0 3px ${token.colorText};
    }

    &:active {
      scale: 0.8;
    }
  `,
);

interface AvatarWithUploadProps {
  compressSize?: number;
  enable?: boolean;
  id?: string;
  size?: number;
  style?: CSSProperties;
}

const AvatarWithUpload = memo<AvatarWithUploadProps>(
  ({ size = 40, compressSize = 256, style, id, enable = true }) => {
    const { styles } = useStyle();
    const [avatar, updateAvatar] = useUserStore((s) => [
      commonSelectors.userAvatar(s),
      s.updateAvatar,
    ]);

    const handleUploadAvatar = useCallback(
      createUploadImageHandler((avatar) => {
        const img = new Image();
        img.src = avatar;
        img.addEventListener('load', () => {
          const webpBase64 = imageToBase64({ img, size: compressSize });
          updateAvatar(webpBase64);
        });
      }),
      [],
    );

    return (
      <div className={styles} id={id} style={{ maxHeight: size, maxWidth: size, ...style }}>
        {!!enable ? (
          <Upload beforeUpload={handleUploadAvatar} itemRender={() => void 0} maxCount={1}>
            <NextImage
              alt={avatar ? 'userAvatar' : 'ChatAI'}
              height={size}
              src={!!avatar ? avatar : DEFAULT_USER_AVATAR_URL}
              unoptimized
              width={size}
            />
          </Upload>
        ) : (
          <NextImage
            alt={avatar ? 'userAvatar' : 'ChatAI'}
            height={size}
            src={!!avatar ? avatar : DEFAULT_USER_AVATAR_URL}
            unoptimized
            width={size}
          />
        )}
      </div>
    );
  },
);

export default AvatarWithUpload;
