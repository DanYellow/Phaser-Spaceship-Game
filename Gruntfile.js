module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta : {
      dev: {
        path: 'dev/',
        vendorsJS: 'dev/javascripts/vendors/',
        bowerPath: './bower_components/'
      },
      prod: {
        path: 'prod/',
        vendorsJS: 'prod/javascripts/vendors/',
        bowerPath: './bower_components/'
      }
    },

    typescript: {
      base: {
        src: ['dev/typescripts/**/*.ts', '!dev/typescripts/phaser.d.ts'],
        dest: 'prod/javascripts',
        options: {
          module: 'amd', //or commonjs
          sourceMap: true,
          basePath: 'dev/typescripts/',
          declaration: true
        }
      }
    },

    copy: {
      vendorsBowerJS: {
        files: [
          { src: '<%= meta.dev.bowerPath %>phaser/phaser.js', dest: '<%= meta.prod.vendorsJS %>phaser.js' },
          { src: '<%= meta.dev.bowerPath %>phaser/phaser.d.ts', dest: 'dev/typescripts/phaser.d.ts' }
        ]
      },

      images: {
        files: [
          {
            expand: true,
            cwd: '<%= meta.dev.path %>images/',
            src: ['**/*'],
            dest: '<%= meta.prod.path %>images/'
          }
        ]
      },

      stylesheets: {
        files: [
          {
            expand: true,
            cwd: '<%= meta.dev.path %>stylesheets/',
            src: ['**/*.css'],
            dest: '<%= meta.prod.path %>stylesheets/'
          }
        ]
      }
    },

    clean: {
      build: {
        src: ["prod/*"]
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "prod/index.html": "dev/views/index.jade"
        }
      }
    },

    watch: {
      javascripts: {
        files: ['dev/typescripts/**/*.ts'],
        tasks: ['typescript'],
        options: {
          livereload: 35729
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['clean', 'jade', 'copy', 'typescript']);
  grunt.registerTask('watcher', ['watch']);

};