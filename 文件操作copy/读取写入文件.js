const fs = require('fs')
const path = require('path')
// 写的操作 没有文件会自动创建文件
const copy = (source,target,callback)=>{
    const SIZE = 3;
    const buffer = Buffer.alloc(SIZE)
    let readOffset = 0;
    let writeOffset = 0;

    // 代表读的文件打开了
    fs.open(source,'r',(err,rfd)=>{ // fd 这个文件描述符是一个数字 linux 规定的 windows 3 , mac
        if(err) return callback(err)
        // 代表写的文件打开了
        fs.open(target,'w',(err,wfd)=>{ // wfd 这个文件描述符是一个数字 linux 规定的 windows 3 , mac
            if(err) return callback(err)

            const next = ()=>{
                fs.read(rfd,buffer,0,SIZE,readOffset,(err,bytesRead)=>{ // bytesRead读取到的个数
                    // 读取到几个就往文件中写几个
                    if(err) return callback(err)
                    readOffset+=bytesRead ; // 更改读取的偏移量
                    fs.write(wfd,buffer,0,bytesRead,writeOffset,(err,written)=>{
                        if(err) return callback(err)
                        writeOffset+=written // 更改写入的偏移量

                        if(bytesRead===SIZE){ // 本次读取完毕后 可能还有结果
                            next()
                        }else{
                            fs.close(rfd,()=>{})
                            fs.close(wfd,()=>{})
                            callback() //完成后
                        }
                    })
                })
            }
            next()
        })
    })
}


copy(path.resolve(__dirname,'name.txt'),path.resolve(__dirname,'copy.txt'),(err)=>{
    if(err){
        return console.log(err)
    }
    console.log('拷贝成功')
})

