class PhotoInputController {
    
    
        constructor(attribute, identifier) {
            this.photo = null;

            this.attribute = attribute;
            this.identifier = identifier;

            this.registerListeners();
            this.checkRequired();
        }   
    
        /**
         * register listeners here. 	
         */
        registerListeners() {
           
            /**
             * When this input is used in a edit context, we can always increment the progressbar, since either the 
             * photo is set, or not mendatory. In both cases the progressbar should be incremented.
             * 
             */
            Event.listen('input:insertValues:' + this.identifier, () => {
                Event.fire('progressbar:increment:' + this.identifier, 'photo');
            });

            /**
             * When the uploaded file is ready for upload, we can increment the progressbar.
             */
            Event.listen('file:ready', () => {
                Event.fire('progressbar:increment:' + this.identifier, 'photo');
            });


            /**
             * When the file is done uploading to the server, we can store it in the photos array.
             */
            Event.listen('file:uploaded', (photo) => {
                this.photo = photo;
            });
        }
    
        /**
         * Checks if the photo is required. 	
         */
        checkRequired() {
            if(!Validator.required(this.attribute.validation)) {
                Event.fire('progressbar:increment:' + this.identifier, 'photo' );
            }
        }
}
    
    
    export default PhotoInputController;
    