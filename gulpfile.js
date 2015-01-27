var gulp = require('gulp');
var gulpTraceur = require('./tools/transpiler/gulp-traceur');

var path = {
  src: ['./src/**/*.js'],
  output: 'dist/amd',
};

var traceurOpts = {
  modules: 'amd',
  types: true,
  annotations: true,
  typeAssertions: true,
  typeAssertionModule: 'assert',
  experimental: true,
};

gulp.task('build_source', function() {
  gulp.src(path.src)
    .pipe(gulpTraceur(traceurOpts))
    .pipe(gulp.dest(path.output));
});

gulp.task('build', ['build_source']);

// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
  gulp.watch([path.src], ['build_source']);
});
