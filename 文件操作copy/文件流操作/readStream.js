// 流 是有方向的  读=>写 node 中实现了stream模块
// 文件也想实现流  所以内部文件系统集成了stream模块


const fs = require('fs')
const path = require('path')
const ReadStream = require('./readStreams')

// 创建一个可读流（可读流对象） 这个方法默认并不会读取内容
// fs.open fs.read fs.close

let rs = new ReadStream(path.resolve(__dirname,'name.txt'),{
    flags:'r', // 代表的是读取
    encoding:null, //默认buffer
    mode:0o666,// 模式 可读可写
    autoClose:true, //fs.close
    start:2, // 2-8 包前又包后
    end:8,
    highWaterMark:3 // 每次读取的个数 3 3 1 
})

// 为了多个异步方法可以解耦 ，发布订阅模式
// 可读流集成了 events 模块 这里的名字必须叫 data rs.emit('data'),如果监听了data 内部会拼命读取文件
// 的内容 触发对应的回调

rs.on('open',(fd)=>{ // 默认会直到文件读取完毕
    console.log(fd)
})

rs.on('data',(data)=>{ // 默认会直到文件读取完毕
    console.log('data==',data)
})

rs.on('end',(data)=>{ // 默认会直到文件读取完毕
    console.log('end',data)
})
// 文件流有两个特殊的事件 ，不是文件流 是普通的流 就没有这两个事件