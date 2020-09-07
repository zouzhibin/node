// node 中如何实现代码调试
// https://nodejs.org/zh-cn/docs/guides/debugging-getting-started/


// vscode 调试 https://www.cnblogs.com/both-eyes/p/10152142.html

// 1、可以在浏览器中进行调试 调试某些模块可以使用这种方式 node --inspect-brk 文件名来解析
// 2、直接webstorm 和vscode 自带调试方式 直接通过launch.json进行调试
// 3、在控制台中调试



// 分析node 源码
// 1、会默认调用require语法
// 2、Module.prototype.require 模块的原型上有require方法
// 3、Module._load 调用模块的加载方法 最终返回的是module.exports
// 4、Module._resolveFilename 解析文件名 将文件名变成绝对路径 默认尝试添加.js/.json/.node
// 5、Module._cache 默认会判断是否存在缓存
// 6、new Module 创建模块（对象） id,exports
// 7、把模块缓存起来 方便下次使用


// ------------------------------- 根据文件名（绝对路径）创建一个模块


// 8、tryModuleLoad 尝试加载模块 module.load
// 9、module.paths 第三方模块查找的路径
// 10、获取当前模块的扩展名 根据扩展名调用对应的方法 Module._extensions 策略模式
// 11、获取文件的内容
// 12 调用module._compile 方法
// 13. 将用户的内容 包裹到一个函数中 (function (exports,require,module,__filename,__dirname){})



// 最终返回的是module.exports 用户会给这个module.exports 进行赋值

// console.log(Function.prototype===Object.__proto__)