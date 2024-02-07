import { useEffect } from 'react';
import { canUseDOM } from '@dnd-kit/utilities';

import type { SensorDescriptor } from '../../sensors';

export function useSensorSetup(sensors: SensorDescriptor<any>[]) {
  useEffect(
    () => {
      if (!canUseDOM) {
        return;
      }

      // const teardownFns = sensors.map(({sensor}) =>       
      // sensor.setup?.()
      // );

      const teardownFns: (() => void)[] = sensors.map(({ sensor }) => {
        if (sensor.setup) {
          return sensor.setup;
        }
        return () => { }; // setupが存在しない場合のダミー関数
      });

      return () => {
        for (const teardown of teardownFns) {
          teardown();
        }
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sensors.map(({ sensor }) => sensor)
  );
}
