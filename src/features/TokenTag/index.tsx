'use client';

import { createStyles, useResponsive } from 'antd-style';
import { forwardRef } from 'react';
import { DivProps, Flexbox } from 'react-layout-kit';

const HEIGHT = 24;
export const ICON_SIZE = 20;

export const useStyles = createStyles(
  (
    { cx, css, token, isDarkMode },
    { type, shape }: { shape: 'round' | 'square'; type: 'normal' | 'low' | 'overload' },
  ) => {
    let percentStyle;

    switch (type) {
      case 'normal': {
        percentStyle = css`
          color: ${token.colorSuccessText};
        `;
        break;
      }
      case 'low': {
        percentStyle = css`
          color: ${token.colorWarningText};
        `;
        break;
      }
      case 'overload': {
        percentStyle = css`
          color: ${token.colorErrorText};
        `;
        break;
      }
    }

    const roundStylish = css`
      padding-block: 0;
      padding-inline: ${(HEIGHT - ICON_SIZE) / 2}px ${(HEIGHT - ICON_SIZE) * 1.2}px;
      background: ${isDarkMode ? token.colorFillSecondary : token.colorFillTertiary};
      border-radius: ${HEIGHT / 2}px;
    `;

    const squareStylish = css`
      border-radius: ${token.borderRadiusSM}px;
    `;

    return {
      container: cx(
        percentStyle,
        shape === 'round' ? roundStylish : squareStylish,
        css`
          user-select: none;

          overflow: hidden;

          min-width: fit-content;
          height: ${HEIGHT}px;

          font-family: ${token.fontFamilyCode};
          font-size: 12px;
          line-height: 1;
        `,
      ),
    };
  },
);

export interface TokenTagProps extends DivProps {
  /**
   * @default 'left'
   */
  displayMode?: 'remained' | 'used';
  /**
   * @description Maximum value for the token
   */
  maxValue: number;
  shape?: 'round' | 'square';
  text?: {
    overload?: string;
    remained?: string;
    used?: string;
  };
  unoptimized?: boolean;
  /**
   * @description Current value of the token
   */
  value: number;
}

const TokenTagIner = forwardRef<HTMLDivElement, TokenTagProps>(
  (
    { className, displayMode = 'remained', maxValue, value, text, shape = 'square', ...rest },
    ref,
  ) => {
    const { mobile } = useResponsive();
    const valueLeft = maxValue - value;
    const percent = valueLeft / maxValue;
    let type: 'normal' | 'low' | 'overload';

    if (percent > 0.3) {
      type = 'normal';
    } else if (percent > 0) {
      type = 'low';
    } else {
      type = 'overload';
    }

    const { styles, cx } = useStyles({ shape, type });

    return (
      <Flexbox
        align={'center'}
        className={cx(styles.container, className)}
        flex={'none'}
        gap={4}
        horizontal
        ref={ref}
        {...rest}
      >
        {valueLeft > 0
          ? [
              mobile
                ? ''
                : displayMode === 'remained'
                  ? text?.remained || 'Remained'
                  : text?.used || 'Used',
              displayMode === 'remained' ? valueLeft : value,
            ].join(' ')
          : text?.overload || 'Overload'}
      </Flexbox>
    );
  },
);

export default TokenTagIner;
