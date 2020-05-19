import storeComponent from './component';
import storePage from './page';

/**
/**
 * 小程序 Component 的封装
 */
export function component() {
  return storeComponent(...arguments);
}
/**
/**
 * 小程序 Page 的封装
 */
export function page() {
  storePage(...arguments);
}
