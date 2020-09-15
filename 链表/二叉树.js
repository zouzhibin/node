class Node {
    constructor(element, parent) { // parent是树中比较重要的属性
        this.element = element;
        this.parent = parent
        this.left = null
        this.right = null
    }
}
class BST { // 不能通过索引取数据
    constructor() {
        this.root = null;
        this.size = 0; // 包含着的节点个数
    }
    add(element) {
        if (this.root === null) {
            this.root = new Node(element, null)
        } else {
            let current = this.root
            let compailer = 0
            let parent = null;
            while (current) {
                parent = current
                // 比根节点大的放右边 比根节点小的放左边
                compailer = current.element - element
                if (compailer > 0) {
                    current = current.left
                } else {
                    current = current.right
                }
            }
            let node = new Node(element, null)
            // 
            if(compailer>0){
                parent.left = node
            }else{
                parent.right = node
            }
        }
        console.log(element)
    }
}

let bst = new BST();
// let arr = [10,8,19,6,15,22,20]
let arr = [10, 8, 9,1]
arr.forEach(element => {
    bst.add(element)
})
console.log(bst)