const fs = require('fs')
const path = require('path')

function readFile(path,obj,cb){
    fs.readFile(path,'utf8',function(err,html){
        // let html = ''
       
        // arguments[0] 就是匹配到的原字符串 arguments[1] 就是第一个原括号
        html = html.replace(/\{\{([^}]+)\}\}/g,function(){
             let key =  arguments[1].trim()
             return '${'+key+'}'  
        })
        let head = `let str = '';\r\n with(obj){\r\n`;
        head+='str+=`'
        console.log('================',)

        html = html.replace(/\{\%([^%]+)\%}/g,function(){
            return '`\r\n'+arguments[1]+'\r\nstr+=`\r\n'
           
        })
        // console.log('================',html)
        let tail = '`}\r\nreturn str;'
        let fn = new Function('obj',head+html+tail)
        cb(err,fn(obj))
        // console.log()
    })
}

readFile(path.resolve(__dirname,'template.html'),{arr:[1,2,3]},function(err,data){
    console.log(data)
})