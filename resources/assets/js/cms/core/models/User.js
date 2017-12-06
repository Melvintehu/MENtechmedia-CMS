import Model from './Model';
import Validator from '../../app/Validator/Validator';
import WalkThrough from '../../app/WalkThrough/WalkThrough';

class User extends Model {

    constructor(data = {}) {
        super(data);

        this.fields = {
            name: {
                type: 'text',
                translation: 'Naam',

            },

            // email: {
            //     type: 'text',
            //     translation: 'Email',
            //     validation: new Validator({
            //         required: true
            //     }),
            // }, 

            photo: {
                type: 'photo',
                translation: 'Kies een foto',
                dimensions: {"1x1": 'portrait'},
                validation: new Validator({
                    required: true
                }),
            },
        };

    }


}

export default User;