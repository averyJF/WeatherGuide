Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  // 在 behaviors 中也可以编写生命周期方法，同时不会与其他 behaviors 中的同名生命周期相互覆盖。但要注意，如果一个组件多次直接或间接引用同一个 behavior ，这个 behavior 中的生命周期函数在一个执行时机内只会执行一次。
  // behaviors 是用于组件间代码共享的特性，类似于一些编程语言中的“mixins”或“traits”。
  lifetimes: {
    created() {
      // 组件实例刚刚被创建好时，created 生命周期被触发。此时，组件数据 this.data 就是在 Component 构造器中定义的数据 data 。 此时还不能调用 setData 。 通常情况下，这个生命周期只应该用于给组件 this 添加一些自定义属性字段。
    },
    attached() {
      this.setData({
        numberA: 1,
        numberB: 2,
      })
      // 在组件实例进入页面节点树时执行
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  observers: {
    'numberA, numberB': function (numberA, numberB) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      this.setData({
        sum: numberA + numberB
      })
    },
    'some.subfield': function (subfield) {
      // 使用 setData 设置 this.data.some.subfield 时触发
      // （除此以外，使用 setData 设置 this.data.some 也会触发）
      subfield === this.data.some.subfield
    },
    'arr[12]': function (arr12) {
      // 使用 setData 设置 this.data.arr[12] 时触发
      // （除此以外，使用 setData 设置 this.data.arr 也会触发）
      arr12 === this.data.arr[12]
    },
    'some.field.**': function (field) {
      // 使用 setData 设置 this.data.some.field 本身或其下任何子数据字段时触发
      // （除此以外，使用 setData 设置 this.data.some 也会触发）
      field === this.data.some.field
    },
    '**': function () {
      // 特别地，仅使用通配符 ** 可以监听全部 setData 。
      // 每次 setData 都触发
    },
  },
  // <2.2.3版本的写法
  // attached() {
  //   // 在组件实例进入页面节点树时执行
  // },
  // detached() {
  //   // 在组件实例被从页面节点树移除时执行
  // },
  ///
  //还有一些特殊的生命周期，它们并非与组件有很强的关联，但有时组件需要获知，以便组件内部处理。这样的生命周期称为“组件所在页面的生命周期”，在 pageLifetimes 定义段中定义。
  ageLifetimes: {
    show() {
      // 页面被展示
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {
      a:'1',
      b:'2'
    }
  },
  methods: {
        // 这里是一个自定义方法
        onTap: function() {
            this.triggerEvent('myevent', {id:456},{composed:false});
        },
        _onlist: function() {
          console.log('自定义方法');
        }
     }
})