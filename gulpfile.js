// 执行此文件时，如何知道用户要start还是要build ？
// console.log( process )//nodejs中的进程对象
// console.log( process.argv[2] )

let mode = process.argv[2] // 'start'  'build'
switch(mode){
  case 'start':
    require('./gulpfile-dev.js')//这里请求这个模块就已经执行模块里的任务了
    break
  case 'build':
    require('./gulpfile-build.js')
    break
}
