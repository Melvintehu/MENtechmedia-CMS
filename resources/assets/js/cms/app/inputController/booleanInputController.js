class BooleanInputController {
    
    
        constructor(attributeName, attribute, identifier, value) {
            this.input = false;
            this.progressBar = null;
            
            this.attributeName = attributeName;
            this.attribute = attribute;
            this.identifier = identifier;
    
            // In edit context
            this.value = value;
    
            this.registerListeners();

                  
            Event.fire('input:updated:' + this.attributeName,  this.input ? 1 : 0);
        }
    
    
        trackInput() {
            let value = this.input ? 1 : 0;
            Event.fire('input:updated:' + this.attributeName,  value);
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
                 this.progressBar.increment(this.attributeName);      
             });
    
    
            /**
             * When this input is used in a edit context, we need to insert the corresponding value
             * by listening to this event, which passed us the correct value for this input.
             */
            Event.listen('input:insertValues:' + this.identifier, () => {
                this.input = this.value[this.attributeName];
              
                let value = this.input ? 1 : 0;

                if(Validator.valid(this.attribute.validation, value)) {
                    this.progressBar.increment(this.attributeName);
                }

                // Tell the CMS the input has changed.
                Event.fire('input:updated:' + this.attributeName, this.input);
            });
    
            /**
             * 	Clear inputs when a new model is persisted.
             */
            Event.listen('inputs:clear', () => {
                this.input = false;

                this.progressBar.increment(this.attributeName);
            });
    
     
        }

    }
    
    
    export default BooleanInputController;
    