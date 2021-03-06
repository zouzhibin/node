// 后端的缓存配置 强制缓存 和协商缓存

// 强制：以后的请求都不需要访问服务器  200

// 协商：你每次来我都判断一下 告诉你是否需要找缓存 304


const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

http.createServer((req,res)=>{
    const {pathname} = url.parse(req.url)
    const filePath = path.join(__dirname,pathname)
    // 对比缓存？我要比较一下 在决定是用缓存好 还是用最新的好？
    // 客户端 if-modified-since
    // 服务端 Last-Modified 对比最后修改时间返回内容

    // 缺点是 内容没变修改时间变化了  也会重新读取内容 b时间不准确 精确到秒 如果一秒内改了多次 也监控不到

    res.setHeader('Cache-Control','no-cache');
    let ifModifiedSince = req.headers['if-modified-since']
    // console.log('ifModifiedSince',ifModifiedSince)
    fs.stat(filePath,(err,statObj)=>{
        if(err){return res.end()}
        let LastModified = statObj.ctime.toGMTString()
        if(ifModifiedSince === LastModified){
            res.statusCode = 304
            return res.end()
        }
        res.setHeader('Last-Modified',LastModified) // 最后修改时间
        console.log(statObj.ctime)
        if(err) return res.statusCode = 404,res.end('Not Found')
        if(statObj.isFile()){
            fs.createReadStream(filePath).pipe(res)
        }else{
            res.statusCode = 404,res.end('Not Found')
        }
    })
}).listen(5000)
