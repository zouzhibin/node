
const {spawn,fork,execFile} = require('child_process')
const path = require('path')
// bat cmd sh 都可以使用这个方法 内部也是基于spawn 

// const cp = execFile('node',['sum.js'],{
//     // current working directory
//     cwd:path.resolve(__dirname,'worker'),
// },function(err,stdout,stderr){
//     console.log(stdout)
// })

// exec 会创建一个命令行 将命令放到命令行中执行
// exec 性能低 因为内部需要产生一个命令行
const cp = execFile('ls',['-ll'],{
    // current working directory
    cwd:path.resolve(__dirname,'worker'),
},function(err,stdout,stderr){
    console.log(stdout)
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
