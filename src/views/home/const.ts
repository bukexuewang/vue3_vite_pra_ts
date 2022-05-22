import { InjectionKey, Ref } from 'vue';

export const GET_COUNT: InjectionKey<Ref<number>> = Symbol('获取计数器');
