import globalStore from './util/globalStore';

export default (config, _page = Page) => {
  const targetConf = {
    ...config,
    onLoad(options = {}) {
      this.$store = globalStore;
      config.onLoad && config.onLoad.call(this, options);
    }
  };
  _page(targetConf);
};
