var config = {
  jaded: {
    app: {
      expand: true,
      cwd: 'views',
      src: ['**/*.jade'],
      dest: 'public/js/templates',
      options: {
        amd: true,
        rivets: false,
        development: true
      }
    }
  },
  watch: {
    app: {
      files: ['views/**/*.jade'],
      tasks: ['jaded:app'],
      options: {
        nospawn: true
      }
    }
  }
};


module.exports = function (grunt) {
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jaded');
  grunt.registerTask('default', ['jaded']);
};
