var gulp = require('gulp');

// Contains all plugins the project depends on
var plugins = require('gulp-load-plugins')();


// Generate the peg from the grammar
function generatePeg() {
  return gulp.src('src/tidal.pegjs')
    .pipe(plugins.pegjs({format: 'commonjs'}))
    .pipe(gulp.dest('dist'));
}

// Run tests
function runTests(){
  return gulp.src('test/*.js', {read:false})
    .pipe(plugins.mocha({ reporter:'nyan'}));
}


// Watch for changes in the peg, any js file or any test file and run tests
function watchFiles(){
  gulp.watch('./src/*', gulp.series('test'));
  gulp.watch('./test/*', gulp.series('test'));
}


// Clean everything that was made with gulp
function clean(){
  return gulp.src('dist/*', {read: false})
    .pipe(plugins.clean())

}

// Task definitions
gulp.task('build', generatePeg);
gulp.task('test', gulp.series('build', runTests));
gulp.task('watch', watchFiles);
gulp.task('clean', clean);
gulp.task('default', gulp.series('build'));
