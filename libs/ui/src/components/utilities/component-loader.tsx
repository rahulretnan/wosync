/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { css, keyframes } from '@emotion/react';

const skeleton = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

interface ComponentLoaderProps {
  loading?: boolean;
  children: ReactElement;
  style?: React.CSSProperties;
  className?: string;
}

export const ComponentLoader: React.FC<ComponentLoaderProps> = ({
  loading = false,
  children,
  style,
  className,
}) => {
  if (!loading) return children;

  const loaderStyle = css`
    animation-name: ${skeleton};
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.06) 25%,
      rgba(0, 0, 0, 0.15) 37%,
      rgba(0, 0, 0, 0.06) 63%
    );
    background-size: 400% 100%;
    animation-duration: 1.4s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
  `;

  return (
    <div
      className={className}
      css={loaderStyle}
      style={{
        ...style,
        width: style?.width ?? '100%',
        height: style?.height ?? 24,
        borderRadius: style?.borderRadius,
      }}
    />
  );
};
export default ComponentLoader;
