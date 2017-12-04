window.Factory = new class{
	
	constructor() {
		this.className = "";
	}

	getInstanceOf(className, data = null) {
		this.className = className;
		return new models[className](data);
	}

	getStaticInstance(className) {
		this.className = className;
		return models[className];
	}
}