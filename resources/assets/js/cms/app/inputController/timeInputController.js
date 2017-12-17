class TimeInputController {
    
    
        constructor(attributeName, attribute, value) {
            this.progressBar = null;
            this.input = "";
            this.attributeName = attributeName;
            this.attribute = attribute;
            this.value = value;
            
            // diff
            this.hour = "";
            this.minutes = "";
            
            // diff
            this.createFinalTime();

            this.registerListeners();
            this.checkRequired();
        }
        

        /**
         * The boot method is used for doing custom
         */
        boot() {
            this.hour = "";
            this.minutes = "";
            this.createFinalTime();
        }

        /**
         * Everytime input changes this method is called.
         */
        onChange() {
            this.createFinalTime();            
        }


        trackInput() {
            this.createFinalTime();
           
            // Tell the CMS the input has changed.
            Event.fire('input:updated', { 
                input: this.input, 
                attributeName: this.attributeName 
            });
            
            
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
            this.createFinalTime();

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
                
                let values = this.value[this.attributeName].split(":");
                this.hour = values[0];
                this.minutes = values[1];

                // combine the hour and minutes input
                this.createFinalTime();
                
                // Tell the CMS the input has changed.
                Event.fire('input:updated', { 
                    input: this.input, 
                    attributeName: this.attributeName 
                });


                // do validation
                if(Validator.valid(this.attribute.validation, this.input)) {
                    this.progressBar.increment(this.attributeName);
                }
    
            });
    
            /**
             * 	Clear inputs when a new model is persisted.
             */
            Event.listen('inputs:clear', () => {
                this.hour = "";
                this.minutes = "";
                
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

        createFinalTime() {
            if(this.hour === "" || this.minutes === "" ) {
                this.input = "";
            } else {
                this.input = this.hour + ':' + this.minutes;
            }
        }
    }
    
    
    export default TimeInputController;
    