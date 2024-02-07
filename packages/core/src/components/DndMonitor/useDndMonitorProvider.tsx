import { useCallback, useState } from 'react';

import type { DndMonitorListener, DndMonitorEvent } from './types';

export function useDndMonitorProvider() {
  const [listeners] = useState(() => new Set<DndMonitorListener>());

  const registerListener = useCallback(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    [listeners]
  );

  const dispatch = useCallback(
    ({ type, event }: DndMonitorEvent) => {
      listeners.forEach((listener) => {
        if (listener[type]) {
          const callback = listener[type];
          if (callback) {
            callback(event as any);
          }
        }
      });
    },
    [listeners]
  );

  return [dispatch, registerListener] as const;
}
