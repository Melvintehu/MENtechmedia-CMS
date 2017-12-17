class InputController {
    
    constructor(attributeName, attribute, value) {
        this.boot();

        this.attributeName = attributeName;
        this.attribute = attribute;
        this.value = value;
        this.input = "";

        this.registerListeners();
        this.checkRequire();
    }

    

}

export default InputController;