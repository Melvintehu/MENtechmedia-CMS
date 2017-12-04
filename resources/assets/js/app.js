
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('toastr/build/toastr.min');
window.SweetAlert = require('sweetalert/dist/sweetalert.min');

window.Vue = require('vue');

// imports
import toaster from 'toastr/build/toastr.min';


window.toastr = toaster;

require('./Objects');

require('./core/classes');


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


// Navigation
Vue.component('navigation', require('./components/nav.vue'));
Vue.component('nav-link', require('./components/nav-link.vue'));
Vue.component('nav-dropdown', require('./components/nav-dropdown.vue'));
Vue.component('nav-link-image', require('./components/navigation/nav-link-image.vue'));

// CORE COMPONENTS GO HERE

// crud
Vue.component('add', require('./components/crud/Add.vue'));
Vue.component('read', require('./components/crud/Read.vue'));
Vue.component('input-renderer', require('./components/InputRenderer.vue'));
Vue.component('input-renderer-update', require('./components/crud/InputRendererUpdate.vue'));

// custom inputs
Vue.component('crud-textarea', require('./components/crud/inputTypes/textarea.vue'));
Vue.component('crud-text', require('./components/crud/inputTypes/text.vue'));
Vue.component('crud-select', require('./components/crud/inputTypes/select.vue'));
Vue.component('crud-website', require('./components/crud/inputTypes/website.vue'));
Vue.component('crud-photo', require('./components/crud/inputTypes/photo.vue'));
Vue.component('crud-date', require('./components/crud/inputTypes/date.vue'));
Vue.component('crud-time', require('./components/crud/inputTypes/time.vue'));
Vue.component('crud-model', require('./components/crud/inputTypes/model.vue'));
Vue.component('crud-number', require('./components/crud/inputTypes/number.vue'));
Vue.component('crud-model-checkbox', require('./components/crud/inputTypes/model_checkbox.vue'));

// progress
Vue.component('progressbar', require('./components/crud/progress/progressbar.vue'));

// validation
Vue.component('validation-display', require('./components/validation/validation_display.vue'));



const app = new Vue({
    el: '#app'
});


