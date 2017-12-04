    /*
    |--------------------------------------------------------------------------
    | Core models
    |--------------------------------------------------------------------------
    |
    | These models are accessable in the entire javascript cms system.
    | 
    | 
    |
    */

    import Entity from './Entity';
    import Section from './Section';
    import UserRole from './UserRole';
    

    let models = {
        entity: Entity,
        section: Section,
        userRole: UserRole,
    }

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
