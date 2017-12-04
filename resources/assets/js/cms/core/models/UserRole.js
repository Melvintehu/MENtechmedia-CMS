import Model from './Model';
import Validator from '../../app/Validator/Validator';

class UserRole extends Model {

    constructor(data = {}) {
        super(data);

        this.fields = {
            name: {
                type: 'text',
                translation: 'Naam',
                validation: new Validator({
                    required: true,
                }),
            },
            
            title: {
                type: 'text',
                translation: 'Titel',
                validation: new Validator({
                    required: true,
                }),
            },

            level: {
                type: 'text',
                translation: 'level',
                validation: new Validator({
                    required: true,
                }),
            },
            
            
        };

    }


}

export default UserRole;
