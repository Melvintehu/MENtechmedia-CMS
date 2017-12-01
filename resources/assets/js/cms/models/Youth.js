import Model from './Model';
import Validator from '../App/Validator';

class Youth extends Model {

    constructor(data = {}) {
        super(data);

        this.fields = {
            first_name: {
                type:  'text',
                translation:  'Voornaam',
                validation: new Validator({
                    required: true,
                }),
            },

            last_name: {
                type: 'text',
                translation: 'Achternaam',
                validation: new Validator({
                    required: true,
                })
            },

            description: {
                type: 'textarea',
                translation: 'Over de jongere',
                validation: new Validator({
                    required: true,
                })
            },

            date_of_birth: {
                type: 'date',
                translation: 'Geboortedatum',
                validation: new Validator({
                    required: true,
                }),
                format: ['d-m-y']
            }, 
            
            photo: {
                type: 'photo',
                translation: 'Kies een foto',
                dimensions: {"3x2": 'landscape' , "1x1": 'portrait'},
                validation: new Validator({
                    required: true,
                }),
            },
        };

    }


}

export default Youth;
