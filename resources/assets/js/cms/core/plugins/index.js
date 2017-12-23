    /*
    |--------------------------------------------------------------------------
    | Plugin imports
    |--------------------------------------------------------------------------
    |
    | Import the plugins below.
    |
    | 
    |
    */  
    
    import FileSystem from './FileSystem/FileSystem';


    /*
    |--------------------------------------------------------------------------
    | Register plugins
    |--------------------------------------------------------------------------
    |
    | We can register plugins to our cms by adding them to the object below. 
    |
    | 
    |
    */  

    window.Plugins = {
        fileSystem: FileSystem,
    };

 
    
    /*
    |--------------------------------------------------------------------------
    | require plugins
    |--------------------------------------------------------------------------
    |
    | 
    | Dynamically requiring the components.
    | 
    |
    */  

    for(let index in window.Plugins) {
        let plugin = new window.Plugins[index];

        require("./" + plugin.constructor.name + '/' + plugin.entry);
    }
