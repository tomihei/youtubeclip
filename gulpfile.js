var gulp = require("gulp");
var typescript = require("gulp-typescript");
var sass = require("gulp-sass");
var cssnext = require("gulp-cssnext");
var autoprefixer = require("gulp-autoprefixer");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var tsConfig = require("./tsconfig.json");
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js");
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');


/*gulp.task("server", function () {
    browser({
        server: {
            baseDir: "./"                       //サーバー起動時のベースディレクトリ
        }
    });
});
*/

gulp.task('browsersync', function() {
  browser.init({
    files:['public/**/*.*','views/**/*.*'],
    proxy: 'http://localhost:3000',
    port: 4000,
    open: false
  });
});

gulp.task('serve', ['browsersync'], function () {
  nodemon({
    script: './bin/www',
    ext: 'js html css',
    ignore: [
      'node_modules',
      'bin',
      'views',
      'public',
      'test',
      'src'
    ],
    env: {
      'NODE_ENV': 'development'
    },
    stdout: false
  }).on('readable', function(){

    this.stdout.on('data', function(chunk) {
      if(/listening/.test(chunk)){
        browser.reload({stream: false});
      }
      process.stdout.write(chunk);
    });
    this.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });
  });
});

gulp.task("sass", function () {
    gulp.src("./src/cli/css/*.scss")             // 対象となるSASSファイルを全部指定
        .pipe(plumber())                        //エラー時にwatchを止めない
        .pipe(sass())                           //SASSのコンパイル
        .pipe(cssnext())                   //CSSのベンダープレフィックス付与を自動化
        .pipe(gulp.dest("./public/stylesheets"))       //指定ディレクトリにCSS出力
});

gulp.task("servType", function (){
  gulp.src(["./src/routes/*.ts"])
      .pipe(typescript(tsConfig.compilerOptions))
      .pipe(gulp.dest("./routes"));
});


/*gulp.task("typescript", function () {
    gulp.src(["./src/cli/ts/*.ts","!./node_modules/**"])              // 対象となるTypeScriptファイルを全部指定
        .pipe(typescript(tsConfig.compilerOptions))
        .pipe(webpack(webpackConfig))   // プロジェクトを渡す事で差分コンパイル
        .pipe(gulp.dest("./public/javascript"))       //指定ディレクトリにJS出力
        .pipe(browser.reload({stream: true}));  //ブラウザを更新
});
*/
gulp.task("typescript", function () {
    gulp.src(["./src/cli/ts/*.ts","!./node_modules/**"])              // 対象となるTypeScriptファイルを全部指定
        .pipe(typescript({ target: "es5", remobeComments: true, sortOutput: true, module: "amd"}))
        .pipe(gulp.dest("./src/cli/js/"))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest("./public/javascripts/"))       //指定ディレクトリにJS出力
        .pipe(browser.reload({stream: true}));  //ブラウザを更新
});



gulp.task("default", ["sass", "typescript", "servType", "serve"], function () {
    gulp.watch("./src/routes/*ts", ["servType"]);
    gulp.watch("./src/cli/**/*.scss", ["sass"]);
    gulp.watch("./src/cli/**/*.ts", ["typescript"]);
});
