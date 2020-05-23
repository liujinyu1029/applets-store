import getBaseConf from './util/base';

export default (config, _page = Page) => {
  const baseConf = getBaseConf(config);
  const targetConf = {
    ...baseConf,
    onLoad: baseConf.install,
    onShow: baseConf.initStore,
    onUnload: baseConf.uninstall
  };
  _page(targetConf);
};
