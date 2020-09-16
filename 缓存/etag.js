// 后端的缓存配置 强制缓存 和协商缓存

// 强制：以后的请求都不需要访问服务器  200

// 协商：你每次来我都判断一下 告诉你是否需要找缓存 304

// md5 摘要算法 ：不是加密算法 （不可逆）
// 1、不可逆  2、不同内容转换的结果不相同 3、转换后的结果都是一样长的

const crypto = require('crypto')
// console.log(crypto.createHash('md5').update('abcd').digest('base64'))

const hash = crypto.createHash('md5')
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

http.createServer((req,res)=>{
    const {pathname} = url.parse(req.url)
    const filePath = path.join(__dirname,pathname)
    // 对比缓存？我要比较一下 在决定是用缓存好 还是用最新的好？
    res.setHeader('Cache-Control','no-cache');

    let ifNoneMatch = req.headers['if-none-match']
    // etag +ifNoneMatch 可以实现对比缓存，比较的方式比较精准 ，但是默认我们不会根据完整的内容生成hash
    //戳 ，可以取文件的某一部分 （开头几行 作为hash），为了保证精确度 内容的一部分+文件的总大小来作为hash戳


    // 项目中  会使用 强制缓存+对比缓存（两个策略都使用）
    fs.stat(filePath,(err,statObj)=>{
        if(err){return res.end()}
        let contentHash = crypto.createHash('md5').update(fs.readFileSync(filePath).digest('base64'))
        if(ifNoneMatch===contentHash){
            res.statusCode = 304
            return res.end()
        }

        res.setHeader('Etag',contentHash)
        // 第一次请求我 我需要根据内容产生一个唯一标识  对应当前的文件
        if(err) return res.statusCode = 404,res.end('Not Found')
        if(statObj.isFile()){
            fs.createReadStream(filePath).pipe(res)
        }else{
            res.statusCode = 404,res.end('Not Found')
        }
    })
}).listen(5000)
