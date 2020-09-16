
const {spawn,fork} = require('child_process')
const path = require('path')
// fork 的特点默认就是使用node 命令

const cp = fork('sum.js',{
    // current working directory
    cwd:path.resolve(__dirname,'worker'),
    // stdio:"ignore" // 如果填写的是ignore 默认会忽略掉 子进程的输出
    // stdio:[0,1,2] // 共享父进程的标准输出 错误输出 以及标准输入
    stdio:[0,1,2,'ipc']
})

cp.send('hello 我是父亲')
cp.on('message',function (data) {
    console.log(data)
})

// 父子间的通信 如何让父进程和子进程通信
cp.on('error',function(err){
    console.log(err)
})

cp.on('close',function(err){
    console.log('子进程关闭了')
})

cp.on('exit',function(err){
    console.log('子进程退出了')
})
