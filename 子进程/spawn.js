// node 中可以开启子进程  目的是为了充分利用多核CPU

// 开启子进程 可以帮助我们计算一些cpu密集型的操作

// 核心模块 创建进程
// spawn 产卵 可以使用流的方式来进行 进程间的通信  核心
//      - fork （用的比较多） 叉子
//      - execFile 执行文件
//      - exec

const {spawn} = require('child_process')
const path = require('path')
// const { pathToFileURL } = require('url')

// process.stdin 当前进程的监听用户的输入 0
// process.stdout 用户标准输出 - console.log 1
// process.stderr 用户的错误输出 - console.error 2




// node sum.js --port xxx --cwd directory

const cp = spawn('node',['sum.js'],{
    // current working directory
    cwd:path.resolve(__dirname,'worker'),
    // stdio:"ignore" // 如果填写的是ignore 默认会忽略掉 子进程的输出
    // stdio:[0,1,2] // 共享父进程的标准输出 错误输出 以及标准输入
    stdio:"pie"
})
// 读流 写流
cp.stdout.on('data',function (data) {
    console.log(data.toString())
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
