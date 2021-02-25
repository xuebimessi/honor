// 加载gulp，并结构需要的方法
let {task,src,dest,watch,series,parallel} = require('gulp')
// let concat = require('gulp-concat')//合并css/js插件
// let uglify = require('gulp-uglify')
// let minifyCss = require('gulp-minify-css')
// let rename = require('gulp-rename')
// let minifyHtml = require('gulp-minify-html')
// let imagemin = require('gulp-imagemin-changba')
// let babel = require('gulp-babel')
let load = require('gulp-load-plugins')()//自动加载其他gulp插件
let del = require('del')//删除文件
// load = {
//   concat: require('gulp-concat'),
//   uglify: require('gulp-uglify'),
//   minifyCss: require('gulp-minify-css'),
//   ...
// }

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist')
})

// 合并css
task('concatCss',async ()=>{
  src('./style/index*')
  .pipe(load.concat('index.css'))
  .pipe(dest('./dist/style'))
})

// 合并压缩css
task('minCss',async ()=>{
  src('./style/index*')
  .pipe(load.concat('index.css'))
  .pipe(load.rev())//给文件名添加哈希值
  .pipe(load.minifyCss())
  .pipe(dest('./dist/style'))
  .pipe(load.rev.manifest())//生成记录哈希值的json文件
  .pipe(dest('./rev/css'))
  .pipe(load.connect.reload())//执行刷新//这里的reload是插件connect中的reload方法和下面的reload任务同名无关//需先启动刷新任务即下面的reload
})

// 合并js
task('concatJs',async ()=>{
  src('./script/*.js')
  .pipe(load.concat('all.js'))
  .pipe(dest('./dist/script'))
})

// 合并并压缩js
task('script',async ()=>{
  src('./script/*.js')
  .pipe(load.concat('all.js'))
  .pipe(load.uglify())
  .pipe(dest('./dist/script'))
})

// 压缩重命名js
task('rename',async ()=>{
  src('./script/jquery-1.8.3.js')
  .pipe(load.uglify())
  .pipe(load.rename('jquery-1.8.3.min.js'))
  .pipe(dest('./dist/script'))
})

// 压缩html
task('minifyHtml',async ()=>{
  src(['./rev/css/*.json','./views/*.html'])
  .pipe(load.revCollector({replaceReved:true}))//替换带哈希值的文件
  .pipe(load.minifyHtml())
  .pipe(dest('./dist'))
})

// 压缩图片
task('imagemin',async ()=>{
  src('./image/*.*')
  .pipe(load.imageminChangba())
  .pipe(dest('./dist/image'))
})

// ES6 -> ES5
task('es6toes5',async ()=>{
  src('./script/app.js')
  .pipe(load.babel({
    presets: ['@babel/env']
  }))
  .pipe(dest('./dist/script'))
})

// 启动一个服务，实现自动刷新
task('reload',async ()=>{
  load.connect.server({
    root: './dist',//设置根目录
    livereload: true//开启自动刷新
  })
})

task('watch',async ()=>{
  watch('./style/index*',series('minCss'))
})

task('default',series('reload','watch'))
