import globalStore from './globalStore';

export default (config, _component = Component) => {
  const { $store } = config;
  const targetConf = {
    ...config,
    created() {
      // 遍历$store中定义的属性集
      Object.keys($store).forEach(key => {
        // 监听属性的set事件
        globalStore.$watch(key, val => {
          // 触发对应的observer响应
          let fun = this[$store[key].observer];
          fun && fun.call(this, val);
        });
      });
      config.created && config.created.call(this);
    }
  };
  _component(targetConf);
};
