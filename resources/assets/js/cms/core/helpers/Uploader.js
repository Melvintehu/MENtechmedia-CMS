window.Uploader = new class{

	constructor() {
		this.dropzone = null;
	}


	init(identifier) {
		Dropzone.options[identifier] = {
                    paramName: "file", // The name that will be used to transfer the file
                    maxFilesize: 20, // MB
                    headers: { "X-CSRF-TOKEN": Laravel.csrfToken },
                    autoProcessQueue: false,
                    accept: (file, done) => {
                        done();
                    },
                    init: function() {
                        myDropzone = this;

                        this.on("addedfile", function(file){
                           Event.fire('file:ready');
                        });
                    },
                    success: (file, response) => {
                       
                        this.photo = null;

                        setTimeout(() => {
                            this.croppedImage = null;
                            this.photo = {
                                id: response.id,
                                filename: response.filename,
                                type: response.type,
                                model_id: response.model_id
                            }



                            setTimeout(() => {
                                Event.fire('file:uploaded', this.photo);
                                Event.fire('setCropper', this.photo);
                            }, 50);
                        }, 10)
                    },
                }
	}

	

}