    
    /*
    |--------------------------------------------------------------------------
    | Require modules
    |--------------------------------------------------------------------------
    |
    |   Require external libraries here
    | 
    | 
    |
    */
    
    require('./imports');
    
    /*
    |--------------------------------------------------------------------------
    | Config
    |--------------------------------------------------------------------------
    |
    |   Config 
    |
    */

    require('./config/app.js');


    /*
    |--------------------------------------------------------------------------
    | CMS and Vue entrypoint
    |--------------------------------------------------------------------------
    |
    | 
    | 
    | 
    |
    */
    
    require('./cms/component-library/index');
    require('./cms/app.js');
    
    const app = new Vue({
        el: '#app',
    });

