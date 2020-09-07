// node 中自己实现的微任务 process.nextTick queueMicrotask(()=>{})
// console.log(process.nextTick)


// 宏任务  setImmediate


// timer 放定时器 
// pending callbacks 上一个事件环没有执行完的会放到pending callbacks 都是内部自己操作的
// idle, prepare   内部调用都是在这里
// poll 主要放文件操作
// check 主要放 setImmediate
// close callbacks 放一些soket关闭的方法


const fs = require("fs")

//poll 完成后 setImmediate->setTimeout
// 绝对先执行 setImmediate 因为是在poll阶段执行
fs.readFile('./1.txt',()=>{
    setTimeout(()=>{ // 进入事件环时 setTimeout 有可能没有完成
        console.log('timeout')
    })
    setImmediate(()=>{
        console.log('setImmediate')
    })
})

// process.nextTick 并不属于事件环的一部分 在本轮代码执行后执行 比promise.then 方法优先级高



// 宏任务
// script / ui渲染 /setTimeout /setInterval / requestFrameAnimation /setImmediate / MessageChannel 都是异步的

// 语言的本身提供的 promise.then mutationObserver nextTick





