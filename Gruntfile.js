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
          basePath: 'dev/typescripts',
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
    },

    clean: {
      build: {
        src: ["prod/*"]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy', 'typescript']);
  grunt.registerTask('watcher', ['watch']);

};