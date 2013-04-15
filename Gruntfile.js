var config = {
  jade: {
    amd: {
      files: {
        'public/js/templates/': ['views/**/*.jade']
      },
      options: {
        wrap: 'amd',
        basePath: 'views/'
      }
    }
  },
  watch: {
    app: {
      files: ['views/**/*.jade'],
      tasks: ['jade:amd'],
      options: {
        nospawn: true
      }
    }
  }
};


module.exports = function (grunt) {
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jade');
  grunt.registerTask('default', ['jade:amd']);
};
