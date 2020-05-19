function Events() {
  // 放置所有添加的 监听事件
  this._events = {};
}
Events.prototype = {
  $watch: function (name, fn, ...argOrg) {
    // 必传参数验证
    if (!name || !fn) {
      throw new Error(`[Events TypeError] Failed to execute 'Events' on '${name}' : 2 arguments required`);
    }
    // 阻止重复添加相同的监听
    let fns = this._events[name] || [];
    if (fns.find(item => item.fnOrg === fn)) {
      return;
    }
    this._events[name] = fns.concat({
      fn: arg => fn.apply(null, [...argOrg, ...arg]),
      fnOrg: fn
    });
  },
  $emit: function (name, ...arg) {
    (this._events[name] || []).forEach(item => {
      item.fn(arg);
    });
  },
  $off: function (name, fn) {
    // 无参数 ： 清掉所有监听
    if (!arguments.length) {
      this._events = Object.create(null);
    }
    // 一个参数 ： 清掉该事件名下所有监听
    if (arguments.length == 1) {
      delete this._events[name];
    }
    let fns = this._events[name];
    if (!fns || !fns.length) return;
    this._events[name] = (fns || []).filter(item => {
      return item.fnOrg !== fn;
    });
  }
};
export default new Events();
