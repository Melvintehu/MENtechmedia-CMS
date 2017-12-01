import Model from './Model';
import Validator from '../App/Validator';

class Candidate extends Model {

    constructor(data = {}) {
        super(data);

        this.fields = {

            first_name: {
                type: 'text',
                translation: 'Voornaam',
                validation: new Validator({
                    required: true,
                }),
            },

            last_name: {
                type: 'text',
                translation: 'Achternaam',
                validation: new Validator({
                    required: true,
                }),
            },

            telephone_number: {
                type: 'text',
                translation: 'Telefoonnummer',
                validation: new Validator({
                    required: true,
                }),
            },

            email_address: {
                type: 'text',
                translation: 'E-mailadres',
                validation: new Validator({
                    required: true,
                }),
            },

            date_of_birth: {
                type: 'date',
                translation: 'Geboortedatum',
                validation: new Validator({
                    required: true,
                }),
            },

            message: {
                type: 'textarea',
                translation: 'Bericht',
                validation: new Validator({
                    required: true,
                }),
            },
                        
        };

    }


}

export default Candidate;
