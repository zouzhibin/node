// 写操作 
const wBuffer = Buffer.from('兵兵')
// r 代表读取  w 代表写入 x 代表执行
// d r4 w2 x1 (当前所属人)  r-x(我家里的人) r-x（别人有什么权限）
// mode权限 chmod -R 777(八进制) 