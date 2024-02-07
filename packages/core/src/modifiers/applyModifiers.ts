import type { FirstArgument, Transform } from '@dnd-kit/utilities';

import type { Modifiers, Modifier } from './types';

export function applyModifiers(
  modifiers: Modifiers | undefined,
  { transform, ...args }: FirstArgument<Modifier>
): Transform {
  if (modifiers) {
    return modifiers.length
      ? modifiers.reduce<Transform>((accumulator, modifier) => {
        return modifier({
          transform: accumulator,
          ...args,
        });
      }, transform)
      : transform;
  } else {
    // 確認
    return transform;
  }
}
