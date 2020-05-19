import _event from './event';

const validator = {
  set: function (target, prop, value) {
    target.$emit(prop, value);
    return Reflect.set(...arguments);
  },
  get: function () {
    return Reflect.get(...arguments);
  }
};
const creat = (defaultData = {}) => {
  return new Proxy(Object.assign(Object.create(_event), defaultData), validator);
};

export default creat({});
