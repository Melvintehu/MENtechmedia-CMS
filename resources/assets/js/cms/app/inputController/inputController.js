class InputController {


    constructor(attributeName, attribute, identifier, value) {
        this.progressBar = null;
        
        this.input = "";
        
        this.attributeName = attributeName;
        this.attribute = attribute;
        

        // In edit context
        this.value = value;

        this.registerListeners();
        this.checkRequired();
    }


    trackInput() {
        
       
        // Tell the CMS the input has changed.
        Event.fire('input:updated:' + this.attributeName, this.input);
        
        // Do validation on the input's value.
        if(!Validator.valid(this.attribute.validation, this.input)) {
            this.progressBar.decrement(this.attributeName);
            return;
        }

        // if nog validation error, we tell the progressbar to increment.
        this.progressBar.increment(this.attributeName);
    }


    /**
     * register listeners here. 	
     */
    registerListeners() {
       

        /**
         * The cms broadcasts when a new progressbar is initialised. We can add it to our inputController,
         * so we can call some functions on it.
         */
         Event.listen('progressBar:get:' + this.attributeName, (progressBar) => {
             this.progressBar = progressBar;
         });


        /**
         * When this input is used in a edit context, we need to insert the corresponding value
         * by listening to this event, which passed us the correct value for this input.
         */
        Event.listen('input:insertValues', () => {
            
            this.input = this.value[this.attributeName];
            
            // Tell the CMS the input has changed.
            Event.fire('input:updated:' + this.attributeName, this.input);
            
            // do validation
            if(Validator.valid(this.attribute.validation, this.input)) {
                this.progressBar.increment(this.attributeName);
            }

        });

        /**
         * 	Clear inputs when a new model is persisted.
         */
        Event.listen('inputs:clear', () => {
            this.input = "";

            this.progressBar.decrement(this.attributeName);
            
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
            this.progressBar.increment(this.attributeName);
        }
    }
}


export default InputController;
