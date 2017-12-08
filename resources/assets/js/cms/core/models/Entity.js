import Model from './Model';
import Validator from '../../app/Validator/Validator';

class Entity extends Model {

    constructor(data = {}) {
        super(data);

        this.fields = {
            name: {
                type: 'text',
                translation: 'Naam van de entiteit',
                validation: new Validator({
                    required: true,
                }),

            },

            title: {
                type: 'text',
                translation: 'Title cms',
                validation: new Validator({
                    required: true
                }),
            },

            description: {
                type: 'textarea',
                translation: 'Beschrijving voor de entiteit',
                validation: new Validator({
                    required: true,
                }),
            },

            nav_group_id: {
                type: 'model',
                model: 'navGroup',
                attributeDisplay: 'name',
                translation: 'Behoort tot Navigatiegroep',
                validation: new Validator({
                    required: true
                }),
            },

            icon: {
                type: 'text',
                translation: 'Kies een material design icon',
                validation: new Validator({
                    required: true
                }),
            }

           
        };

    }


}

export default Entity;