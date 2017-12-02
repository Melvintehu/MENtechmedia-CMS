    /*
    |--------------------------------------------------------------------------
    | Imports
    |--------------------------------------------------------------------------
    |
    | Import external libraries here
    | 
    | 
    |
    */
    
    import toaster from 'toastr/build/toastr.min';
    import moment from 'moment';

    /*
    |--------------------------------------------------------------------------
    | Require modules
    |--------------------------------------------------------------------------
    |
    | Require external libraries here
    | 
    | 
    |
    */
        
    let bootstrap = require('./bootstrap');
    let owlCarousel = require('owl-carousel-2/owl.carousel');
    let toastr = require('toastr/build/toastr.min');
    let vue = require('vue');
    let wow = require('wowjs/dist/wow.min').WOW;
    let sweetAlert =  require('sweetalert/dist/sweetalert.min');

    /*
    |--------------------------------------------------------------------------
    | Window
    |--------------------------------------------------------------------------
    |
    | Bind libraries to the window below here
    | 
    | 
    |
    */
        
    window.SweetAlert = sweetAlert;
    window.WOW = wow;
    window.Vue = vue;
    window.toastr = toaster;
    window.moment = require('moment');


    /*
    |--------------------------------------------------------------------------
    | Settings and init
    |--------------------------------------------------------------------------
    |
    */
	
    moment.locale('nl');

    $(document).ready(function() {
        new WOW().init();
    });

    /*
    |--------------------------------------------------------------------------
    | CMS entrypoint
    |--------------------------------------------------------------------------
    |
    | 
    | 
    | 
    |
    */
	
    require('./cms/app.js');
    

    const app = new Vue({
        el: '#app',
    });

