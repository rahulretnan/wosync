import { BlockerFn } from '@tanstack/history';
import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

export function useBlocker(
  blockerFn: BlockerFn,
  condition: boolean | any = true,
): void {
  const { history } = useRouter();

  useEffect(() => {
    if (condition) {
      history.block(blockerFn);
    }
  }, []);
}
