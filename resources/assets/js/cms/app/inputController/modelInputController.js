class ModelInputController {
    
    
        constructor(attributeName, attribute, identifier, value) {
            this.select = "NOTVALID";
            this.progressBar = null;
            this.optionValues = [];

            this.attributeName = attributeName;
            this.attribute = attribute;
    
            // In edit context
            this.value = value;

            this.getModelOptionValues();
            this.registerListeners();
            this.checkRequired();
        }
    
        /**
         * Keeps track of changes made to the input. Any updates will be notified to the CMS.
         * The progressbar will be updated everytime the input changes.
         */
        trackInput() {

            if(this.select === 'NOTVALID') {
                this.progressBar.decrement(this.attributeName);
                return;
            } 

            Event.fire('input:updated:' + this.attributeName, this.select);
            
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
            Event.listen('input:insertValues' , () => {
                this.select = this.value[this.attributeName];
                
                // // Tell the CMS the input has changed.
                Event.fire('input:updated:' + this.attributeName, this.input);
                
                // do validation
                if(this.select !== 'NOTVALID') {
                    this.progressBar.increment(this.attributeName);
                    return;
                }
    
            });
    
            /**
             * 	Clear inputs when a new model is persisted.
             */
            Event.listen('inputs:clear', () => {
                this.select = "NOTVALID";
                
                this.progressBar.decrement(this.attributeName);
                
                this.checkRequired();
            });
    
            /**
             * 	When the save button is pressed, we check if this input meets the requirements 
             *	to be persisted to the database.
                */
            Event.listen('validator:validate', () => {
                Validator.valid(this.attribute.validation, this.select);
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
    