    /*
    |--------------------------------------------------------------------------
    | Modules CMS
    |--------------------------------------------------------------------------
    |
    | These files are used to load the different modules of the CMS.
    |
    | 
    |
    */

    require('./core/imports');
    require('./core/helpers/Classes');
    require('./Objects');
    require('./core/models/objects');
    

    /*
    |--------------------------------------------------------------------------
    | Base CMS components
    |--------------------------------------------------------------------------
    |
    | The components below are part of the core of the CMS. They are used to 
    | dynamiccaly provide the crud operations required in almost every  
    | project.
    |
    */
    

    // dashboard
    Vue.component('dashboard-search',  require('./components/dashboard/DashboardSearch.vue'));
    
    // progress
    Vue.component('progressbar', require('./components/crud/progress/progressbar.vue'));
    
    // Password forget
    Vue.component('forgot-password', require('./components/password-forget/forgot-password.vue'));
    
    // navigation
    Vue.component('nav-link', require('./components/nav/nav-link.vue'));
    Vue.component('pull-menu-cms', require('./components/menu/pull-menu-cms.vue'));
    
    Vue.component('overlay', require('./components/overlay/overlay.vue'));
    
       

    /*
    |--------------------------------------------------------------------------
    | Core crud components
    |--------------------------------------------------------------------------
    |
    | Components that are vital to the CMS. They are the core of the generated
    | crud functionality. 
    | 
    |
    */

    Vue.component('add', require('./components/crud/Add.vue'));
    Vue.component('read', require('./components/crud/Read.vue'));
    Vue.component('input-renderer', require('./components/InputRenderer.vue'));
    Vue.component('input-renderer-update', require('./components/crud/InputRendererUpdate.vue'));
    


    /*
    |--------------------------------------------------------------------------
    | Custom inputs
    |--------------------------------------------------------------------------
    |
    | The custom inputs are used to provide certain functionality out of the
    | box. The prefix 'crud' is required in order to avoid naming collisions
    | with other components that might exists in future projects.
    |
    */

    Vue.component('crud-boolean', require('./components/crud/inputTypes/boolean.vue'));
    Vue.component('crud-date', require('./components/crud/inputTypes/date.vue'));
    Vue.component('crud-model', require('./components/crud/inputTypes/model.vue'));
    Vue.component('crud-model-checkbox', require('./components/crud/inputTypes/model_checkbox.vue'));
    Vue.component('crud-number', require('./components/crud/inputTypes/number.vue'));
    Vue.component('crud-photo', require('./components/crud/inputTypes/photo.vue'));
    Vue.component('crud-select', require('./components/crud/inputTypes/select.vue'));
    Vue.component('crud-time', require('./components/crud/inputTypes/time.vue'));
    Vue.component('crud-textarea', require('./components/crud/inputTypes/textarea.vue'));
    Vue.component('crud-text', require('./components/crud/inputTypes/text.vue'));
    Vue.component('crud-website', require('./components/crud/inputTypes/website.vue'));
    Vue.component('crud-youtube', require('./components/crud/inputTypes/youtube.vue'));
    
    
    /*
    |--------------------------------------------------------------------------
    | Live page edit components
    |--------------------------------------------------------------------------
    |
    | These components are used on the website, to provide the user with an 
    | easy way to edit certain elements on a webpage. Currently you can 
    | only edit sections of webpages that contain text. 
    |
    */
    
    Vue.component('editable-section', require('./components/crud/live-text-editors/editable-section.vue'));
    Vue.component('editable-title', require('./components/crud/live-text-editors/editable-title.vue'));
    Vue.component('editable-text', require('./components/crud/live-text-editors/text.vue'));

    /*
    |--------------------------------------------------------------------------
    | Photo edit components
    |--------------------------------------------------------------------------
    |
    | Because photos are much more complex then editing text or basic crud, we
    | use custom components that are specifically made for managing photos. 
    | They are automatically loaded when used in your javascript models.
    |
    */

    Vue.component('image-display', require('./components/ImageDisplay.vue'));
    Vue.component('image-uploader', require('./components/ImageUploader.vue'));
    Vue.component('cropper', require('./components/Cropper.vue'));
    
    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    |
    | Validation is made easy with the components below. These are used to 
    | display any error messages the are fired from a custom input.
    | 
    |
    */


    Vue.component('validation-display', require('./components/validation/validation_display.vue'));


    /*
    |--------------------------------------------------------------------------
    | Tutorials
    |--------------------------------------------------------------------------
    |
    | The CMS is focused on providing the best user expierence possible.
    | That's why we have some tutorial components. These components guide
    | the user and provide the user with feedback in the cms when need.
    |
    */

    Vue.component('tooltip', require('./components/tutorials/tooltip.vue'));


    /*
    |--------------------------------------------------------------------------
    | 
    |--------------------------------------------------------------------------
    | 
    | 
    | 
    | 
    |
    */