const EventEmitter = require('events')

const fs = require('fs');
const { Console } = require('console');
class ReadStream extends EventEmitter{
    constructor(path,opts = {}){
        super()
        this.path = path ;
        this.flags = opts.flags||'r'
        this.mode = opts.mode||0o666;
        this.autoClose = opts.autoClose||true;
        this.start = opts.start||0
    
        this.end = opts.end;
        // 读取的数量默认是64k 如果文件大于64k 就可以采用流的方式
        // 1个字符 1个字节 1024字节是1k 1024k = 1m
        this.highWaterMark = opts.highWaterMark||64*1024
        // 记录读取的偏移量
        this.pos = this.start
        // 默认创建一个可读流 是非流动模式 不会触发data事件 如果用户监听了data事件后 需要变为流动模式
        this.flowing = false // 是否为流动模式


        this.on('newListener',(type)=>{
            if(type==='data'){
                // 用户监听了data
                this.flowing = true
                this.read() // 读文件
                console.log('111111111')
            }
        })

        this.open() // 打开文件 fs.open
    }
    open(){
        console.log('22222222')
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
           
            if(err){
                return this.emit('error',err)
            }
            this.fd = fd ;// 保存到实例上  用于稍后的读取操作
            this.emit('open',fd)
        })
    }

    read(){
        // console.log('333333333')
        // 读取必须要等待文件打开完毕 ，如果打开了会触发open事件
    
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>this.read())
        }
        // 在这之后 文件肯定已经打开了  可以开始进行读取操作
        const buffer = Buffer.alloc(this.highWaterMark)
        // 每次理论上应该读取highWaterMark个 但是用户能指定了读取的位置
        let howMuchToRed = this.end?Math.min(this.end-this.pos+1,this.highWaterMark):this.highWaterMark // 应该读取几个
     
        fs.read(this.fd,buffer,0,howMuchToRed,this.pos,(err,bytesRead)=>{
            if(bytesRead){
                this.pos+=bytesRead; // 每次读取到后累加
                this.emit('data',buffer.slice(0,bytesRead))
                // 代表是否暂停 还是继续
                if(this.flowing){
                    this.read() // 代表如果没有读完 就继续往下读
                }
            }else{
                this.emit('end') // 代表读完了
                // 如果开启了自动关闭了
                if(this.autoClose){
                    fs.close(this.fd,()=>{
                        this.emit('close')
                    })
                }
            }
        })
    }
    pause(){
        this.flowing = false
    }
    resume(){
        this.flowing = true
        this.read()
    }



}
module.exports = ReadStream


