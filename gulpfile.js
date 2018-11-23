// // gulpプラグインの読み込み
// const gulp = require('gulp');
// // gulpプラグインを読み込む
// const sass         = require('gulp-sass');
// var concat         = require('gulp-concat');
// const uglify       = require('gulp-uglify');
// const header       = require('gulp-header');
// const webserver    = require('gulp-webserver');
// // const plumber      = require('gulp-plumber');
// // const rename       = require('gulp-rename');
// // const htmlhint     = require('gulp-htmlhint');
// // const csslint      = require('gulp-csslint');
// // const autoprefixer = require('gulp-autoprefixer');
// // const cleancss     = require('gulp-clean-css');
// // const util         = require('gulp-util');
// // const browserify   = require('browserify');
// // const babelify     = require('babelify');
// // const source       = require('vinyl-source-stream');


// gulpプラグインの読み込み
const gulp = require('gulp');
// Sassをコンパイルするプラグインの読み込み
const sass     = require('gulp-sass');
const plumber  = require('gulp-plumber');
const concat   = require('gulp-concat');
const uglify   = require('gulp-uglify');

// style.scssをタスクを作成する
// concat
gulp.task('scss.concat', function () {
    return gulp.src('assets/scss/*.scss')
    .pipe(plumber())
    .pipe(concat('style.scss'))
    .pipe(gulp.dest('assets/main-scss/'));
});
gulp.task('scss.compile', function () {
    // style.scssファイルを取得 ※return必須
    return gulp.src('assets/main-scss/style.scss')
        .pipe(plumber())
        // Sassのコンパイルを実行
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        // cssフォルダー以下に保存
        .pipe(gulp.dest('assets/css'));
});

// jsファイル用
// concat
gulp.task('js.concat', function () {
    return gulp.src('assets/js/*.js')
    .pipe(plumber())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('assets/main-js/'));
});
// コードを見にくくuglify
gulp.task('js.uglify', function() {
    return gulp.src('assets/main-js/bundle.js')
      .pipe(plumber())
      .pipe(uglify('bundle.min.js'))
      .pipe(gulp.dest('assets/main-js/'));
});
gulp.task('js', gulp.series('js.concat', 'js.uglify'))
gulp.task('scss', gulp.series('scss.concat', 'scss.compile'))



gulp.task('watch', function () {
    gulp.watch('assets/scss/*.scss', gulp.task('scss'));
    gulp.watch('assets/js/*.js', gulp.task('js'));
});

gulp.task('default', gulp.series( gulp.parallel('scss', 'js')));
// gulp.task('default', gulp.series( gulp.parallel('scss', 'task1')));