module.exports = function(grunt) {

	grunt.initConfig({

		// watch css & js dirs for updates
		watch: {
			css: {
				files: ['public/src/css/sass/*.scss'],
				tasks: ['sass', 'cssmin']
			},
			js: {
				files: ['public/src/js/*.js'],  // watch all js files
				tasks: ['uglify']
			}
		},

		// run nodemon
		nodemon: {
			dev: {
				script: 'app.js'
			}
		},

		// run these processes concurrently
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']  // run both concurrently
		},

		// sass
		sass: {
			dist: {
				files: {
					'public/src/css/styles.css': ['public/src/css/sass/styles.scss']
				}
			}
		},

		// minify js
		uglify: {
			build: {
				files: {
					'public/dist/js/client.min.js': ['public/src/js/client.js']
				}
			}
		},

		// minify styles
		cssmin: {
			build: {
				src: ['public/src/css/*.min.css', 'public/src/css/styles.css'],
				dest: 'public/dist/css/styles.min.css'
			}
		}

	});

	// load dependencies
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// register tasks
	grunt.registerTask('default', ['concurrent']);
}




