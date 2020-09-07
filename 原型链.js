function Girl(){
    this.name = 100
}
Girl.prototype.a = 10
function Animal(){
    Girl.call(this)
}
Animal.prototype = Object.create(Girl.prototype)

let b = new Girl()
let c = new Animal()
console.log(c.prototype)