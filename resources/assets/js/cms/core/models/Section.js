import Model from './Model';
import Validator from '../../app/Validator/Validator';
import WalkThrough from '../../app/WalkThrough/WalkThrough';


class Section extends Model {

    constructor(data = {}) {
        super(data);

        this.fields = {

            title: {
                type: 'text',
                translation: 'Titel',
                validation: new Validator({
                    required: true,
                }),
                walkThrough: new WalkThrough([
                    "Het onderstaande invoerveld is bedoeld om tekst in te voeren." +
                    "Klik met de muis op het vak. U kunt vervolgens beginnen met typen." + 
                    "Het systeem geeft u automatisch feedback op wat u op dat moment intypt.",

                    'Met titel bedoelen we de titel van deze sectie. ' + 
                    'Deze zult u op de pagina zien, waar deze sectie door ons geplaatst is.',
                    
                    
                    'Secties aanpassen kunt het best doen op de pagina zelf. ' + 
                    'Dat doet u door op de pagina zelf, op het "aanpassen" icoontje te drukken. U kunt vervolgens de gewenste tekst invoeren. '
                ]),
            },

            
	


        };

    }


}

export default Section;
