// This is your typical build step for Jade and Less... Nothing really special
var config = {
  less: {
    development: {
      options: {
        paths: ['public/css']
      },
      files: {
        "public/css/style.css": "public/css/style.less"
      }
    }
  },
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
      files: ['views/**/*.jade', 'public/css/style.less'],
      tasks: ['jade:amd', 'less:development'],
      options: {
        nospawn: true
      }
    }
  }
};


module.exports = function (grunt) {
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-jade');
  grunt.registerTask('default', ['jade:amd', "less:development"]);
};
