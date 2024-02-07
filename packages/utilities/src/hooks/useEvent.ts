import { useCallback, useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useEvent<T extends Function>(handler: T | undefined) {
  const handlerRef = useRef<T | undefined>(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback(function (...args: any) {
    if (handlerRef.current == undefined) {
      return;
    }
    return handlerRef.current(...args);
  }, []);

}
