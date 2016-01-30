var gulp        = require('gulp'),
	jshint      = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	filter      = require('gulp-filter'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;

var config = {
	'browserSync': { // http://www.browsersync.io/docs/options/
		'server'  : [''],
		'port'    : 1100,
    	'directory': true,
		'notify'  : !true,
		'browser' : 'chrome'
	},
	'js': {
		'src' : 'src/js/**/*.js'
	},
	'jshint':{
		'options':{ // http://jshint.com/docs/options/#laxcomma
			// 'laxbreak': true, // ignore Bad line breaking
			'asi': true, // supresses missing semicolons
			'lastsemic': true,
			'expr': true,
		}
	},
};

gulp.task('default', function () {
	browserSync(config.browserSync);

	gulp.watch('*.html', reload);

	gulp.watch([config.js.src], reload);
	gulp.watch([config.js.src], ['js']);

});


gulp.task('js', function() {
	gulp.src(config.js.src)
		.pipe(jshint(config.jshint.options))
		.pipe(jshint.reporter(stylish))
		.on('error', errorLog);
});


function errorLog(error) {
	console.error(error.message);
	this.emit('end'); // watch를 멈추지 않게 한다
}

