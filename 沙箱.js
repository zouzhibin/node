// 虚拟机模块（沙箱）干净的环境 测试用例
// 内部一般情况下操作的都是字符串逻辑 如何让一个字符串来运行 `console.log(1)`

// eval 默认会取当前的作用域下的变量 不干净的环境 eval()


const a = 100
let fn = new Function('c',`console.log(a)`) // 可以用new Function 来创建一个沙箱环境 让字符串执行

fn()

// 模板引擎的实现原理  with语法 + 字符串拼接+new Function 来实现·


const vm = require('vm'); // 虚拟机模块 可以创建沙箱环境
vm.runInThisContext(`let a= 10;console.log(a)`)