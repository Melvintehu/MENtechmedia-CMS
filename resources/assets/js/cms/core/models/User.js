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
                validation: new Validator({
                    required: true,
                }),
            },

            email: {
                type: 'text',
                translation: 'Email',
                validation: new Validator({
                    required: true
                }),
            }, 

            password: {
                type: 'text',
                translation: 'Wachtwoord',
                validation: new Validator({
                    required: true
                }),
            }, 

            phone_number: { 
				type: 'text', 
				translation: 'Telefoonnummer',
				validation: new Validator({
					required: true
				})  
            },
            
            role_id: { 
				type: 'model-checkbox',
				model: 'userRole',
				referenceField: 'name',
				translation: 'Rolnaam', 
				validation: new Validator({
					required: true
                }),
                hidden: true,
			},

            photo: {
                type: 'photo',
                translation: 'Kies een foto',
                dimensions: {"1x1": 'portrait'},
                validation: new Validator({
                    required: true
                }),
                hidden: true,
            },
        };

    }


}

export default User;