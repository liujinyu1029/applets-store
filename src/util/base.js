import globalStore from './globalStore';

export default config => {
  const { $store } = config;
  const targetConf = {
    ...config,
    // 初始化 安装$store
    install() {
      this.$store = globalStore; //在this上绑定$store，用于唯一赋值手段 this.$store.xx = 1
      this.$watchFunList = []; // 记录所有监听事件函数，用于回收释放
      if ($store && typeof $store === 'object') {
        // 遍历$store中定义的属性集
        Object.keys($store).forEach(key => {
          // 事件监听的回调函数
          let watchFun = val => {
            setTimeout(() => {
              this.setData({
                $store: globalStore
              });
            }, 0);
            console.log('globalStore', globalStore, val);
            // 触发对应的observer响应
            let fun = this[$store[key].observer];
            fun && fun.call(this, val);
          };
          // 监听属性的set事件
          globalStore.$watch(key, watchFun);
          // 存储 监听的回调事件 用于后续注销
          this.$watchFunList.push([key, watchFun]);
        });
      }
      config.created && config.created.call(this);
    },
    // 页面创建时，赋值this.data.$store
    // 处理config.$store 的 default 配置
    initStore() {
      Object.keys($store).forEach(key => globalStore[key] === undefined && (globalStore[key] = $store[key].default));
      this.setData({
        $store: globalStore
      });
    },
    // 卸载
    uninstall() {
      // 组件移除后，清空globalStore中对应的属性监听事件
      this.$watchFunList.forEach(args => globalStore.$off.apply(globalStore, args));
    }
  };
  return targetConf;
};
