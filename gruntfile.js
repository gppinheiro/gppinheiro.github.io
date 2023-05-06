module.exports = function (grunt) { 
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks); 
    // Project configuration. 
    grunt.initConfig({ 
        pkg: grunt.file.readJSON('package.json'), 
        cssmin: { 
            sitecss: { 
                options: { 
                    banner: '' 
                }, 
                files: { 
                    'dist/oldstyle.min.css': [ 
                        'oldstyle/open-iconic-bootstrap.min.css', 
                        'oldstyle/animate.css', 
                        'oldstyle/owl.carousel.min.css', 
                        'oldstyle/owl.theme.default.min.css', 
                        'oldstyle/magnific-popup.css', 
                        'oldstyle/aos.css', 
                        'oldstyle/ionicons.min.css', 
                        'oldstyle/flaticon.css', 
                        'oldstyle/icomoon.css', 
                        'oldstyle/style.css', 
                        'oldstyle/partials/_global.css'] 
                } 
            } 
        }, 
        uglify: { 
            options: { 
                compress: true 
            }, 
            applib: { 
                src: [ 
                'oldjs/jquery.min.js', 
                'js/jquery-migrate-3.0.1.min.js', 
                'js/popper.min.js', 
                'js/bootstrap.min.js', 
                'js/jquery.easing.1.3.js', 
                'js/jquery.waypoints.min.js', 
                'js/jquery.stellar.min.js', 
                'js/owl.carousel.min.js', 
                'js/jquery.magnific-popup.min.js', 
                'js/aos.js', 
                'js/jquery.animateNumber.min.js', 
                'js/scrollax.min.js',
                'js/main.js'], 
                dest: 'dist/oldjs.js' 
            } 
        } 
    }); 
    // Default task. 
    grunt.registerTask('default', ['uglify', 'cssmin']); 
};