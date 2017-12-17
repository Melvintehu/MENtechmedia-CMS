class ModelInputController {
    
    
        constructor(attributeName, attribute, value) {
            this.progressBar = null;
            this.attributeName = attributeName;
            this.attribute = attribute;
            this.value = value;
            this.input = "";
                
                
            // diff
            this.optionValues = [];
            this.getModelOptionValues();
            
            this.registerListeners();
            this.checkRequired();
        }
    
        /**
         * Keeps track of changes made to the input. Any updates will be notified to the CMS.
         * The progressbar will be updated everytime the input changes.
         */
        trackInput() {

            if(this.input === 'NOTVALID') {
                this.progressBar.decrement(this.attributeName);
                return;
            } 

            // Tell the CMS the input has changed.
            Event.fire('input:updated', { 
                input: this.input, 
                attributeName: this.attributeName 
            });
            
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
            Event.listen('progressBar:get', (progressBar) => {
                this.progressBar = progressBar;
            });
    
    
            /**
             * When this input is used in a edit context, we need to insert the corresponding value
             * by listening to this event, which passed us the correct value for this input.
             */
            Event.listen('input:insertValues' , () => {
                this.input = this.value[this.attributeName];
                
                // Tell the CMS the input has changed.
                Event.fire('input:updated', { 
                    input: this.input, 
                    attributeName: this.attributeName 
                });
                                
                // do validation
                if(this.input !== 'NOTVALID') {
                    this.progressBar.increment(this.attributeName);
                    return;
                }
    
            });
    
            /**
             * 	Clear inputs when a new model is persisted.
             */
            Event.listen('inputs:clear', () => {
                this.input = "NOTVALID";
                
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
            if(!Validator.required(this.attribute.validation)) {
                this.progressBar.increment(this.attributeName);
            }
        }

        /**
         * Get the associated model's values from the database.
         */
        getModelOptionValues() {
            $(document).ready(() => {
            
            Factory.getStaticInstance(this.attribute.model)
                   .all()
                   .then((objects) => {
                              
                           this.optionValues = _.map(objects, (object) => {
                               return {
                                   id: object.id, 
                                   value: object[this.attribute.attributeDisplay]
                               }
                           });
                    });
            });	
        }
    }
    
    
    export default ModelInputController;
    