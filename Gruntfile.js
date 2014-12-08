module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      options: {
        bare: true
      },

      compile: {
        files: {
          'dist/js/grandcentral.js': ['src/coffee/*.coffee'],
          'demo/grandcentral.js': ['src/coffee/*.coffee']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('default',['coffee']);
};