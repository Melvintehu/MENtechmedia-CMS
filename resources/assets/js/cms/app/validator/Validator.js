class Validator{

	constructor(validationRules) {
		this.validationRules = validationRules;
		this.errors = {};
	}


	reset() {
		this.errors = {};
	}

	valid(value) {
		return window.Validator.valid(this, value);
	}

	required() {
		return window.Validator.required(this);
	}


}

export default Validator;

