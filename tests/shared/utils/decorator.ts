import { test } from '@playwright/test';

export function step(name: string) {
  return function <T extends (...args: any[]) => any>(originalMethod: T, context: ClassMethodDecoratorContext) {
    return async function (this: any, ...args: any[]) {
      return await test.step(name, async () => {
        return originalMethod.apply(this, args);
      });
    };
  };
}
