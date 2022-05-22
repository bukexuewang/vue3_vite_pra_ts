import { InjectionKey } from 'vue';

type EventsKey<T = any> = InjectionKey<T> | any;

export class EventsBus {
  private map = new Map<EventsKey, Set<Func>>();

  on<T extends Func>(key: EventsKey<T>, fn: T) {
    const value = this.map.get(key);
    if (value) {
      value.add(fn);
    } else {
      this.map.set(key, new Set([fn]));
    }
    return this;
  }

  emit<T extends Func>(key: EventsKey<T>, ...args: FnParamType<T>) {
    const fnArr = this.map.get(key);
    if (fnArr?.size) {
      fnArr.forEach(fn => fn(...args));
    } else {
      console.warn('还未绑定');
    }
    return this;
  }

  off(key: EventsKey<any>, fn?: Func) {
    const fnArr = this.map.get(key);
    if (fnArr?.size) {
      if (fn) fnArr.delete(fn);
      if (!fnArr.size || !fn) this.map.delete(key);
    } else {
      console.warn(`该${key}没有绑定函数`);
    }
    return this;
  }

  once<T extends Func>(key: EventsKey<T>, fn: T) {
    const cpFn = (...args: FnParamType<T>) => {
      fn(...args);
      this.off(key, cpFn);
    };
    this.on(key, cpFn);
    return this;
  }

  clear() {
    this.map.clear();
    return this;
  }
}

export const events = new EventsBus();

export const safeRegisterEvent = <T = any>(key: InjectionKey<T>, value: unknown) => {
  const bindFn = (fn: Func) => {
    fn(value);
  };
  events.on(key, bindFn);
  onUnmounted(() => {
    console.log('执行了events的卸载');
    events.off(key, bindFn);
  });
};

export const getRegisterEvent = <T = unknown>(key: InjectionKey<T>): T | undefined => {
  let res: T | undefined;
  events.emit(key, (param: T) => {
    res = param;
  });
  return res;
};
