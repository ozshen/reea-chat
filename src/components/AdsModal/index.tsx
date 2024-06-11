import { ActionIcon, Modal } from '@lobehub/ui';
import { ShoppingCart } from 'lucide-react';
import { memo, useState } from 'react';

import { getAppConfig } from '@/config/app';
import { DESKTOP_HEADER_ICON_SIZE, MOBILE_HEADER_ICON_SIZE } from '@/const/layoutTokens';

import AdsInner from './AdsInner';

const AdsButton = memo<{ ishead?: boolean; mobile?: boolean }>(({ ishead, mobile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { SHOP_URL } = getAppConfig();

  return (
    <>
      <ActionIcon
        icon={ShoppingCart}
        onClick={() => setIsModalOpen(true)}
        size={mobile ? MOBILE_HEADER_ICON_SIZE : ishead ? DESKTOP_HEADER_ICON_SIZE : 'large'}
        title={'Hots'}
      />
      <Modal footer={null} onCancel={() => setIsModalOpen(false)} open={isModalOpen}>
        <AdsInner content={SHOP_URL} />
      </Modal>
    </>
  );
});

export default AdsButton;
