    /*
    |--------------------------------------------------------------------------
    | Plugin model imports
    |--------------------------------------------------------------------------
    |
    | Import the plugin models here.
    |
    | 
    |
    */

    import Folder from './folder';

    
    let models = {
        folder: Folder,
    };

    /*
    |--------------------------------------------------------------------------
    | Adding models to the window object
    |--------------------------------------------------------------------------
    |
    | The models are added to the window object so they are accessable everywhere.
    | 
    | 
    |
    */

    window.models = Object.assign(window.models, models);