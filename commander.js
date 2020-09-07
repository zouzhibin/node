// commander    yargs webapck  都可以解析命令行参数
const program = require("commander") ;

program.version("1.0.0")
program.option('-p,--port <v>','set your port')
program.option('-c,--config <v>','set your config file')
let r = program.parse(process.argv)
console.log(r)