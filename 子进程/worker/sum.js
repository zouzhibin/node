let total = 0

for(let i=0;i<100*1000;i++){
    total+=i
}
// console.log(total)

// process.stdout.write(total+'')
process.on('message',function (data) {
    console.log(data)
    console.log('我是儿子')
})
