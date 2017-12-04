import Validator from '../App/Validator';

class Model {

	constructor(data) {
		this.relations = {};
		_.each(data, (value, attribute) => {
			this[attribute] = value;
		});
	}

	data() {
 		return Object.assign({}, this);
	}

	static all() {
		// TODO : throw an exception if Factory.className is undefined
		return new Promise((resolve, reject) => {
			API.get(Factory.className).then((objects) => {
				resolve(
					_.map(objects, (object) => {
						return Factory.getInstanceOf(Factory.className, object);
					})
				);
			}, reject);

		});
	}

	static find(id) {
		// TODO : throw an exception if Factory.className is undefined
		return new Promise((resolve, reject) => {
			API.get(`${Factory.className}/${id}/edit`).then((data) => {
				resolve(Factory.getInstanceOf(Factory.className, data));
			}, reject);
		});
	}

	static where(parameters) {
		// TODO : throw an exception if Factory.className is undefined
		return new Promise((resolve, reject) => {
			let data = API.buildQueryString(parameters);
			API.get(`${Factory.className}/where?` + data).then((objects) => {
				resolve(objects);
			}, reject);

		});
	}

	save(className, success) {
		
		API.post(className, this.data(), success, function() {
			// notify the user if something went wrong.
		});
	}

	update(className, success) {
		API.put(`${className}/` + this.id, this.data(), success, function() {
			// notify the user if something went wrong.
		});
	}

	delete(className, success) {
		API.delete(className, this.id);
		success();
	}

	// with(relation) {

	// }

	belongsTo(relation) {
		return new Promise((resolve, reject) => {

			let className = this.constructor.name.toLowerCase();		
			Factory.getStaticInstance(relation.toLowerCase())
				   .find(relation.toLowerCase(), this[relation.toLowerCase() + '_id'])
				   .then((data) => {
						resolve(data);
					});
		});
	}




	hasMany(relation) {
		return new Promise((resolve, reject) => {
			let className = this.constructor.name.toLowerCase();
			let parameters = {};

			parameters[className + '_id'] = this.id;

			Factory.getStaticInstance(relation.toLowerCase())
				   .where(relation.toLowerCase(), parameters)
				   .then((data) => {
						resolve(data);
					});
		});
	}



}

export default Model;

