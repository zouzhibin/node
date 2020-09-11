const zlib = require('zlib'); // 天生的 里面包含着压缩的方式
const fs = require('fs');
// 根据替换来实现的 重复率越高 压缩后的结果越小


// 如果文件大的话 都读取到了内存中 耗内存
zlib.gzip(fs.readFileSync('./test/1.txt'),(err,data)=>{
    console.log(data)
    fs.writeFileSync('./test/2.txt.gz',data)
})

// 转化流  (服务端的文件 =>(压缩))   =>客户端
// zlib.createGzip()
fs.createReadStream('./text/1.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream("2.txt.gz"))