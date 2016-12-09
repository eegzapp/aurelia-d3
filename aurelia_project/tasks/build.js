import gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processJson from './process-json';
import processCSS from './process-css';
import {build} from 'aurelia-cli';
import project from '../aurelia.json';

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(addStatic),
  gulp.parallel(
    transpile,
    processMarkup,    
    processJson,
    processCSS
  ),
  writeBundles
);

function addStatic() {
  console.log(project);
    return gulp
        .src("src/assets/*")
        .pipe(gulp.dest('./scripts/assets'));
}

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  console.log('writing bundles');
  return build.dest();
}
