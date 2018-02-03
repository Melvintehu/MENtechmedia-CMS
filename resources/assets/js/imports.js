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
    let sweetAlert =  require('sweetalert/dist/sweetalert.min');
    let vue = require('vue');
    let owlCarousel = require('owl-carousel-2/owl.carousel');
    let wow = require('wowjs/dist/wow.min').WOW;
    
    
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
    
    window.toastr = toaster;
    window.moment = require('moment');
    window.Vue = vue;
    window.SweetAlert = sweetAlert;
    window.WOW = wow;

