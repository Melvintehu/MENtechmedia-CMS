import InputController from "./inputController";

class TimeInputController extends InputController {
    constructor(attributeName, attribute, identifier, value) {
        super(attributeName, attribute, identifier, value);

        super.registerListeners();
        super.checkRequired();
    }





}

export default TimeInputController;