class Uploader {

	constructor(identifier) {
		Dropzone.autoDiscover = false;
		this.init(identifier);
	}

	init(identifier) {
		console.log(identifier);
		let _this = this;

		$(document).ready(function() {
			this.dropzone = new Dropzone("div#" + identifier, { url: "/photo"});
			this.dropzone.options.autoProcessQueue = false;
			this.dropzone.options.headers = { "X-CSRF-TOKEN": Laravel.csrfToken };
			this.dropzone.options.maxFiles = 1;
			this.dropzone.options.maxFileSize = 20000;
			this.dropzone.options.acceptedFiles = 'image/*';

			// handle the response if the file is uploaded
			this.dropzone.on('success', (file, response) => {
				_this.handleResponse(response);
			})

			// remove the file after the upload of the file has finished
			this.dropzone.on('complete', (file) => {
				this.dropzone.removeFile(file);
			});

			this.dropzone.on('addedfile', () => {
				Event.fire('file:ready');
			});

		});
	}

	//  Handle the response
	handleResponse(response) {

		let photo = null;

		photo = {
			id: response.id,
			filename: response.filename,
			type: response.type,
			model_id: response.model_id
		}
		
		Event.fire('file:uploaded', photo);
	}

	// process all queued files 
	processQueue(model_id, model_type) {

		$(document).ready(function() {
			this.dropzone.options.params = {
				"model_id": model_id,
				"model_type": model_type
			}

			this.dropzone.processQueue();
		});
	}


}

export default Uploader;