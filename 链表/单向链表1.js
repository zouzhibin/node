// 链表有头部 和长度 并且有指针
class Node{ // 节点类
    constructor(element,next){
        this.element = element; // 存放的数据
        this.next = next
    }
}

class LinkedList {
    constructor() {
        this.head = null ;// 链表的头部 头指针
        this.size = 0; // 链表的长度
    }
    add(index,element){
        if(arguments.length===1){
              // 像后面添加的  如果只传一个参数  那么传入的参数就是要添加的元素
            element = index
            index = this.size
        }
         // 越界情况
         if(index<0||index>this.size){ throw new Error('越界') }
         // 头部插入
        if(index === 0){ 
            let head = this.head // 老的头部
            // 设置新头，将老的头部 变为当前节点 的下一个
            this.head = new Node(element,head)
         // 其他地方插入   
        }else{
            // debugger
            // 先找到当前索引的上一个
            let prevNode = this.getNode(index-1)
            // 将当前上一个人的next 指向新的节点 新的节点的下一个指向上一个的next
            prevNode.next = new Node(element,prevNode.next)
        }
        this.size++
    }
    getNode(index){ // this.head 的引用关系没断
        let current = this.head ; // 从头开始找
        for(let i =0;i<index;i++){
            current = current.next
        }
        return current // 不停的向后找 找到索引的位置
    }
    reverLinkedList(){
       let newHeader = null
       let head = this.head 
       while(head!==null){
            let temp = head.next
            head.next = newHeader
            newHeader = head
            head = temp
       }
       this.head = newHeader
    }
    set(){

    }
    get(){

    }
    remove(){

    }
}
let ll = new LinkedList()
ll.add(1)
ll.add(2)
ll.add(3)
// ll.add(2,600)
// ll.add(300)
ll.reverLinkedList()
console.log(ll)

// 添加key 可以直接添加内容 在尾部添加


// let obj1 = {name:1}
// let head = obj1
// obj1 = {name:2} 
// console.log(head)

