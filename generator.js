// generator 生成器=>遍历器（需要有一个next方法） 


const likeArray = {0:"a",1:"b",2:"c",3:"d",length:4}

// 第一种写法
// likeArray[Symbol.iterator] = function(){
//     let i =0;
//     return { // 遍历器
//         next:()=>{
//             return {value:this[i],done:i++===this.length}
//         }
//     }
// }

// 第二种写法
likeArray[Symbol.iterator] = function *(){ //generator 函数可以生成遍历器
    let i =0;
    while(i!==this.length){ // generator 固定语法 yield 必须要配合着*来使用
        yield this[i++]
    }
}


function * read(){
    let a = yield 1
    console.log(a)
    yield 2
}
let it = read()
console.log(it.next())
