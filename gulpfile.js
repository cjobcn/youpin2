// -------------------------
// -------------------------
var gulp = require('gulp');
var gulpTasks = require('./gulp_tasks/index.js');

var deps = {};
deps.livereload = require('gulp-livereload');
deps.sass = require('gulp-ruby-sass');
deps.jade = require('gulp-jade');
deps.notify = require("gulp-notify");
deps.changed = require('gulp-changed');
deps.path = require('path');
deps.workUrls = require('./gulp_res/work_urls.js');

gulpTasks.jade(gulp, deps);
gulpTasks.sass(gulp, deps);
gulpTasks.watch(gulp, deps);
gulpTasks.defaults(gulp, deps);
