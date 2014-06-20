module.exports = function(grunt) {

  grunt.initConfig({
	pkg:grunt.file.readJSON('package.json'),
	clean: { // REMOVES ALL GENERATED JS AND CSS FILES
		css: ['public/css/build/'],
		js: ['public/js/build/']
	},
	sass: {     // all scss files will be converted respective css files
        dist: {
			options: {
                //style: 'compressed',
                //precision: 5
            },
			files: [{
				expand: true,
				cwd: 'public/css/src/',
				src: ['*.scss'],
				dest: 'public/css/build/',
				ext: '.css'
			}]
        }
    },
	concat: { // This will combine the js files into a single unit
		dist: {
			src: [
				'public/js/libs/*.js', // All JS in the libs folder
				'public/js/main.js'  // This specific file
			],
			dest: 'public/js/build/production.js',
		}
	},
	jshint: { // JSHINT FOR JS LINTING
		files: ['public/js/*.js'],
		options: {
			jshintrc: '.jshintrc',
			ignores: ['public/js/build/libs/*']
		},
	},

	uglify: { // This will compress the file 
		production: { // Production code
			options: {
				mangle: false,
				beautify: false
			},
			files: {
				'public/js/build/production.min.js': 'public/js/build/production.js'
			}
		}
	},
	
	imagemin: { // compressing all the image files 
		dynamic: {
			files: [{
				expand: true,
				cwd: 'public/images/src/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'public/images/build/'
			}]
		}
	},
	watch: {
		scripts: {
			files: ['public/js/*.js', 'public/js/libs/*.js'],
			tasks: ['concat', 'uglify'],
			options: {
				spawn: false,
				livereload: true,
			}
		},
		css: {
			files: 'public/css/src/*.scss',
			tasks: ['sass'],
			options: {
				spawn: false,
				livereload: true
			}
		}
	}

  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  
  grunt.registerTask('default', ['clean','sass','concat','jshint','uglify:production','imagemin','watch']);
  grunt.registerTask('dev', ['watch']);

}