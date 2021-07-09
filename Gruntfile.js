'use strict';

module.exports = function (grunt) {
    var getDate = (timestamp) => {
        var dt = null;
        var str;
        if (!timestamp) timestamp = Date.now();
        dt = new Date(timestamp);
        str = dt.getFullYear() + '-';
        if (dt.getMonth() < 9) str += '0';
        str += dt.getMonth() + 1;
        str += '-';
        if (dt.getDate() < 10) str += '0';
        str += dt.getDate();
        return str;
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['dist/*.*', 'dist/css/*.*', 'src/css/*.css']
            }
        },
        copy: {
            build: {
                files: [
                    {
                        cwd: 'src',
                        src: ['*.js', '*.css'],
                        dest: 'dist',
                        expand: true
                    },
                    {
                        cwd: 'src/css',
                        src: ['*.css'],
                        dest: 'dist/css',
                        expand: true
                    }
                ]
            }
        },
        uglify: {
            options: {
                preserveComments: 'some', // will preserve all comments that start with a bang (!) or include a closure compiler style directive (@preserve)
                mangle: false, // false to prevent changes to your variable and function names.
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'dist/loading-layer.min.js': ['dist/loading-layer.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: ['*.css', '!*.min.css'],
                        dest: 'dist',
                        ext: '.min.css'
                    }
                ]
            }
        },
        remove_comments: {
            js: {
                options: {
                    multiline: true,
                    singleline: true,
                    keepSpecialComments: false
                },
                cwd: 'dist',
                src: 'loading-layer.js',
                expand: true,
                dest: 'dist'
            },
            css: {
                options: {
                    multiline: true,
                    singleline: true,
                    keepSpecialComments: false
                },
                cwd: 'dist',
                src: 'loading-layer.css',
                expand: true,
                dest: 'dist'
            }
        },
        concat: {
            js: {
                files: [
                    {
                        src: ['src/header.txt', 'dist/loading-layer.js'],
                        dest: 'dist/loading-layer.js'
                    },
                    {
                        src: ['src/header.txt', 'dist/loading-layer.min.js'],
                        dest: 'dist/loading-layer.min.js'
                    }
                ]
            },
            css: {
                files: [
                    {
                        src: ['src/header.txt', 'dist/loading-layer.css'],
                        dest: 'dist/loading-layer.css'
                    },
                    {
                        src: ['src/header.txt', 'dist/loading-layer.min.css'],
                        dest: 'dist/loading-layer.min.css'
                    }
                ]
            }
        },
        replace: {
            header: {
                options: {
                    patterns: [
                        {
                            json: {
                                'version-number': '<%= pkg.version %>',
                                'version-date': getDate(Date.now())
                            }
                        }
                    ]
                },
                files: [
                    {
                        src: ['dist/loading-layer.js'],
                        dest: 'dist/loading-layer.js'
                    },
                    {
                        src: ['dist/loading-layer.css'],
                        dest: 'dist/loading-layer.css'
                    },
                    {
                        src: ['dist/loading-layer.min.js'],
                        dest: 'dist/loading-layer.min.js'
                    },
                    {
                        src: ['dist/loading-layer.min.css'],
                        dest: 'dist/loading-layer.min.css'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-remove-comments');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', 'Compiles all of the assets and files to dist directory.', ['clean', 'copy', 'remove_comments:js', 'remove_comments:css', 'uglify', 'cssmin', 'concat:js', 'concat:css', 'replace:header']);
};
