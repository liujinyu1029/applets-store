# applets-store -- 专为小程序开发的"状态管理模式"

帮助小程序开发者，通过使用 applets-store 提供的 page、component 替代原 Page、Component，即可直接调用\$store，做全局变量管理，并且会同步更新页面。

## Install

```
$ npm i applets-store -s
```

## Page 使用方法

page.js

```js
import { page as storePage } from 'applets-store';
storePage({
  // $store 声明配置 [必须]
  $store: {
    // 声明 $store.agreeNum (只有声明后的变量才能在当前页使用)
    agreeNum: {
      default: 0 //默认值 [非必须，推荐写上，健壮代码的同时，还可以提示变量类型]
      observer: 'onChange_agreeNum',
    }
  },
  onShow(){
    let { $store } = this.data;
    console.log('$store.agreeNum',$store.agreeNum)
    // 直接对变量赋值即可，不用像小程序通过setData赋值
    $store.agreeNum += 1;
  },
  onChange_agreeNum(newVal) {
    console.log('page onChange $store.agreeNum', newVal);
  },
})
```

page.html

```r
<view class="container">
  <view>Agree：{{ $store.agreeNum }}</view>
</view>
```

## Component 使用方法

component.js (基本与 page 中使用一致)

```js
import { component as storeComponent } from 'applets-store';
storeComponent({
  $store: {
    agreeNum: {
      observer: 'onChange_agreeNum',
      default: 0
    }
  },
  attached() {
    let { $store } = this.data;
    console.log('输出全部全局变量$store', $store);
    $store.agreeNum += 1;
  },
  methods: {
    onChange_agreeNum(newVal) {
      console.log('component onChange $store.agreeNum', newVal);
    }
  }
});
```

component.html

```r
<view class="container">
  <view>Agree：{{ $store.agreeNum }}</view>
</view>
```

## Demo

还没看懂？没关系，这里有现成的 Demo
