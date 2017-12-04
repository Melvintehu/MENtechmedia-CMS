import Model from './Model';
import Validator from '../../app/Validator/Validator';

class Section extends Model {

    constructor(data = {}) {
        super(data);

        this.fields = {
            id: {
                type: 'number',
                translation: 'Identifier'
            },

            title: {
                type: 'text',
                translation: 'Titel',
                validation: new Validator({
                    required: true,
                }),
            },

            body: {
                type: 'textarea',
                translation: 'De body van de sectie',
                validation: new Validator({
                    required: true,
                }),
            },

        };

    }


}

export default Section;
