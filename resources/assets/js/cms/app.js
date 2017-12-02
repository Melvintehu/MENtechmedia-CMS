/**
 * require custom helpers
 */
require('./helpers/Classes');
require('./Objects');

Vue.component('tooltip', require('./components/tutorials/tooltip.vue'));

// dashboard
Vue.component('dashboard-search',  require('./components/dashboard/DashboardSearch.vue'));

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
Vue.component('crud-boolean', require('./components/crud/inputTypes/boolean.vue'));

// progress
Vue.component('progressbar', require('./components/crud/progress/progressbar.vue'));


// Password forget
Vue.component('forgot-password', require('./components/password-forget/forgot-password.vue'));

// navigation
Vue.component('nav-link', require('./components/nav/nav-link.vue'));
Vue.component('pull-menu-cms', require('./components/menu/pull-menu-cms.vue'));
Vue.component('image-display', require('./components/ImageDisplay.vue'));
Vue.component('image-uploader', require('./components/ImageUploader.vue'));
Vue.component('cropper', require('./components/Cropper.vue'));
Vue.component('overlay', require('./components/overlay/overlay.vue'));

Vue.component('validation-display', require('./components/validation/validation_display.vue'));

/**
 * Live page edit components
 */

 Vue.component('editable-section', require('./components/crud/live-text-editors/editable-section.vue'));
 Vue.component('editable-title', require('./components/crud/live-text-editors/editable-title.vue'));
 Vue.component('editable-text', require('./components/crud/live-text-editors/text.vue'));