// 通过 fs 模块想实现拷贝功能

const fs = require('fs')

// 从读取默认不指定编码都是buffer类型
// let r = fs.readFileSync('./name.txt')
// 默认会将二进制转换成字符串写到文件中  虽然看到的是字符串 但是内部存储的都是二进制
// fs.writeFileSync('./age.txt',r)



// copyFile 会默认把拷贝的文件“整个”读取一遍 特点不能读取比内存大的文件 （会占用很多可用内存）