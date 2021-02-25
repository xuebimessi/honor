let name = '张三'
let say = ()=>{
  console.log('hello')
}
class Cat{
  constructor(n,c){
    this.name = n
    this.color = c
  }
  skill(){
    console.log('卖萌')
  }
}
let cat1 = new Cat('小白','black')
cat1.skill()
