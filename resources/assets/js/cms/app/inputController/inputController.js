class InputController {


    constructor(attributeName, attribute, identifier, value) {
        this.input = "";

        this.attributeName = attributeName;
        this.attribute = attribute;
        this.identifier = identifier;
        this.value = value;

        this.registerListeners();
        this.checkRequired();
    }


    trackInput() {
        
       
        // Tell the CMS the input has changed.
        Event.fire('input:updated:' + this.attributeName, this.input);
            
        // Do validation on the input's value.
        if(!Validator.valid(this.attribute.validation, this.input)) {
            Event.fire('progressbar:decrement:' + this.identifier, this.attributeName);
            return;
        }

        // if nog validation error, we tell the progressbar to increment.
        Event.fire('progressbar:increment:' + this.identifier, this.attributeName);
    }


    /**
     * register listeners here. 	
     */
    registerListeners() {
       
        /**
         * When this input is used in a edit context, we need to insert the corresponding value
         * by listening to this event, which passed us the correct value for this input.
         */
        Event.listen('input:insertValues:' + this.identifier, () => {
            
            this.input = this.value[this.attributeName];
            
            // Tell the CMS the input has changed.
            Event.fire('input:updated:' + this.attributeName, this.input);
            
            // do validation
            if(Validator.valid(this.attribute.validation, this.input)) {
                Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
            }

        });

        /**
         * 	Clear inputs when a new model is persisted.
         */
        Event.listen('inputs:clear', () => {
            this.input = "";

            this.checkRequired();
        });

        /**
         * 	When the save button is pressed, we check if this input meets the requirements 
         *	to be persisted to the database.
            */
        Event.listen('validator:validate', () => {
            Validator.valid(this.attribute.validation, this.input);
        });
    }

    /**
     * Checks if the input is required. 	
     */
    checkRequired() {
        if(!Validator.required(this.attribute.validation, this.input)) {
            Event.fire('progressbar:increment:' + this.identifier, this.attributeName );
        }
    }
}


export default InputController;
