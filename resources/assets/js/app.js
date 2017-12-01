/**
 * Imports below
 */
import toaster from 'toastr/build/toastr.min';
import moment from 'moment';

/**
 * Require below here
 */
let bootstrap = require('./bootstrap');
let owlCarousel = require('owl-carousel-2/owl.carousel');
let toastr = require('toastr/build/toastr.min');
let scrollTo = require('./custom-scripts/scrollTo');
let vue = require('vue');
let wow = require('wowjs/dist/wow.min').WOW;
let sweetAlert =  require('sweetalert/dist/sweetalert.min');

/**
 * window setup below
 */ 
window.SweetAlert = sweetAlert;
window.WOW = wow;
window.Vue = vue;
window.toastr = toaster;
window.moment = require('moment');


/**
 * Set app language
 */
moment.locale('nl');


/**
 * Initialize wow
 */
$(document).ready(function() {
    new WOW().init();
});



/**
 * CMS
 */
require('./cms/app.js');
// END


const app = new Vue({
    el: '#app',
});

