const gulp          = require('gulp');
const sass          = require('gulp-sass');
const autoprefix    = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const clean         = require('gulp-clean-css');
// const notify        = require('gulp-notify');
const gulpIf        = require('gulp-if');
const sourcemaps    = require('gulp-sourcemaps');
const del           = require('del');
const browserSync   = require('browser-sync').create();
const config        = require('./config');
// const package        = require('./package');
const path          = require('path');
const webpack       = require('webpack');
const merge         = require('merge-stream');
const rename        = require("gulp-rename");
const source        = require('vinyl-source-stream');
const buffer        = require('vinyl-buffer');


var isDevelopment = false;

gulp.task('server', function(){
    browserSync.init(config.tasks.browserSync);
    browserSync.watch(config.root.dest).on('change',function(){
        browserSync.reload();
    })
});

gulp.task('sass',function(){

    return gulp.src(path.resolve(config.root.src, config.tasks.css.src, "**/*.*"))
        .pipe(gulpIf(isDevelopment,sourcemaps.init()))
        .pipe(sass())
    //    .on('error',notify.onError())
        .pipe(autoprefix())
        .pipe(clean())
        .pipe(gulpIf(isDevelopment,sourcemaps.write()))
        .on('error',(er)=>{
            console.log(`error: ${er.lineNumber}: ${er.fileName}: ${er.message}`);
        })
        .pipe(gulp.dest(path.resolve(config.root.dest,config.tasks.css.dest)));
        //.pipe(function(){
        //    browserSync.reload();
        //});

});
console.log(path.resolve(config.root.dest, config.tasks.js.dest))
var webpackConfig = {
    context: path.resolve(config.root.src, config.tasks.js.src),
    entry:  {
        index: "./index"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(config.root.dest, config.tasks.js.dest),
        publicPath: config.root.dest
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders:[

            {
                test: /\.js$/,
                exclude:  /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015'],
                    compact: false
                }
               
            },
            { test: /\.html$/, loader: 'html' }
        ]
    }
};

gulp.task('jsPackage', function(callback) {
    var initialCompile = false;
    //new webpack.optimize.UglifyJsPlugin({
    //    compress: {
    //        warnings: false,
    //        drop_console: true,
    //        unsafe: true
    //    }
    //});
    webpack(webpackConfig, function(err, stats) {

        //     browserSync.reload();
        // On the initial compile, let gulp know the task is done
        if(!initialCompile) {
            initialCompile = true;

            callback()
        }
    });


});


gulp.task('js', function(callback) {
    var initialCompile = false;
    webpack(webpackConfig).watch(200, function(err, stats) {
console.log('sdf')
       
        // On the initial compile, let gulp know the task is done
        if(!initialCompile) {
            initialCompile = true;
            callback()
        
        }
    })
});

gulp.task('createConfig',function(){
    var stream = source('config.json');
    var configObj = config.api;
    stream.write('var config = ' + JSON.stringify(configObj) );
    process.nextTick(function() {
        stream.end();
    });
    stream
        .pipe(buffer())
        .pipe(rename('config.js'))
        .pipe(gulp.dest(path.resolve(config.root.dest, config.tasks.js.dest)));
    return stream;
});

gulp.task('copy',function(){
    return gulp.src(path.resolve(config.root.src, "**/*.{html,json,ico,css,otf,svg,ttf,woff,woff2}"))
        .pipe(gulp.dest(config.root.dest));
});
gulp.task('image',function(){
    return gulp.src(path.resolve(config.root.src, config.tasks.img.src) + '**/*.*')
        .pipe(gulp.dest(config.root.dest));
});

gulp.task('watch', function(){
    gulp.watch([path.resolve(config.root.src, config.tasks.css.src) + '**/*.*'], gulp.series('sass'));

    gulp.watch([path.resolve(config.root.src, "**/*.html")], gulp.series('copy'));
   

});

gulp.task('clean',function(){
    return del(config.root.dest);
});

gulp.task('make',gulp.series('createConfig','sass','image','js','copy',gulp.parallel('server','watch')));


gulp.task('developmentSetting',function(){
    isDevelopment = true;
    webpackConfig.devtool = 'source-map';
    webpack.debug = true;
    var pipe = gulp.src(config.root.src);
    return merge.call(this, pipe);
});

gulp.task('build', gulp.series('clean',gulp.series('createConfig','sass','image','jsPackage','copy')));

gulp.task('default', gulp.series('clean','developmentSetting','make'));