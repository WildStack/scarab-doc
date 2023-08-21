import { decorate, injectable } from 'inversify';
import { IocContainer } from './container';

interface Constructor {
  new (...args: object[]): object;
}

export function Singleton(cls: Constructor) {
  IocContainer.getContainer()?.bind(cls).toSelf().inSingletonScope();
  decorate(injectable(), cls);
}

export function Injectable(cls: Constructor) {
  IocContainer.getContainer()?.bind(cls).toSelf();
  decorate(injectable(), cls);
}
