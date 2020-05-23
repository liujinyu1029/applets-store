import getBaseConf from './util/base';

export default (config, _component = Component) => {
  const baseConf = getBaseConf(config);
  const targetConf = {
    ...baseConf,
    created: baseConf.install,
    attached: baseConf.initStore,
    detached: baseConf.uninstall
  };
  _component(targetConf);
};
