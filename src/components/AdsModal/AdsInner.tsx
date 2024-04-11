import { Icon } from '@lobehub/ui';
import { Button, Divider, Tag } from 'antd';
import { ShoppingCart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { SHOPPING, imageUrl } from '@/const/url';

const AdsInner = memo(() => {
  return (
    <>
      <Image
        alt={'banner'}
        height={602}
        src={imageUrl('banner_support_ads_.png')}
        style={{ height: 'auto', marginBottom: 24, width: '100%' }}
        width={1602}
      />
      <h3>
        <Tag color={'gold'}>{'提供高速率接入服务'}</Tag>
      </h3>
      <p>
        <Icon icon={Sparkles} />
        {' - 使用高质量的账号池，突破官方API速率限制，接口调用 不限速！不限速！不限速！'}
        <br />
        <br />
        <Icon icon={Sparkles} />
        {' - 接口消耗的token计算方式与官方公布的算法一致，日志72小时定时自动清理不留存。'}
        <br />
        <br />
        <Icon icon={Sparkles} />
        {' - 多个高速服务器为你提供服务，7x24小时AI智能故障处理，生产稳定有保障。'}
        <br />
        <br />
        <Icon icon={Sparkles} />
        {' - 账号永不过期，可用token数永不清零，有效额不因市场价格浮动。'}
      </p>
      <Divider />
      <Button onClick={() => window.open(SHOPPING, '__blank')} type={'default'}>
        <Flexbox align={'center'} gap={4} horizontal justify={'center'}>
          Get KEY
          <Icon icon={ShoppingCart} />
        </Flexbox>
      </Button>
    </>
  );
});

export default AdsInner;
