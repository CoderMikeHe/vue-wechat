module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: [1, 2]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

// https://segmentfault.com/q/1010000011675886/a-1020000011676399
// https://juejin.im/post/5c36af60f265da61682b91dd
// https://blog.csdn.net/qq_40128375/article/details/84781282
// https://blog.csdn.net/weixin_37580235/article/details/82021921
// https://segmentfault.com/a/1190000015315545
// https://www.jianshu.com/p/f35a7e97356a
// https://blog.csdn.net/weixin_36222137/article/details/80040758
// https://segmentfault.com/a/1190000015315545
// http://web.jobbole.com/94786/
// [ESLint配置详解](https://blog.csdn.net/mafan121/article/details/77965252)
// https://blog.csdn.net/FavoriteStudent/article/details/82218157

// https://www.jianshu.com/p/24e6054405c3?utm_campaign
// https://www.jianshu.com/p/7fdcb29080da

// https://prettier.io/docs/en/integrating-with-linters.html

// https://blog.csdn.net/shenxianhui1995/article/details/81604818

// VSCode配置 Debugger for Chrome插件 https://www.jianshu.com/p/66033d4949bf
