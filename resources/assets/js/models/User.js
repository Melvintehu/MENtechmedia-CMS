import Model from './Model';
import Validator from '../App/Validator';

class User extends Model {

	constructor(data = {}) {
		super(data);

		this.fields = {
			name: { 
				type: 'text', 
				translation: 'Naam',
				validation: new Validator({
					required: true
				}) 
			},

			email: { 
				type: 'text', 
				translation: 'Emailadres',
				validation: new Validator({
					required: true
				})  
			},

			phone_number: { 
				type: 'text', 
				translation: 'Telefoonnummer',
				validation: new Validator({
					required: true
				})  
			},
		};

	}

	

}

export default User;