module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                beautify: false
            },
            build: {
                src: [
                    'src/core.js',
                    'src/utils/*.js',
                    'src/charts/*.js',
                    'src/displays/*.js'
                    ],
                dest: 'build/<%= pkg.version %>/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['build/<%= pkg.version %>/*'], dest: 'examples/lib/<%= pkg.name %>.min.js', filter: 'isFile'} // includes files in path
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy']);

};
