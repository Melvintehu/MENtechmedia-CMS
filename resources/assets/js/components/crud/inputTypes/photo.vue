<template>
	<!-- custom input type website -->

	<div  v-if="attribute.type == 'photo'">
		<div class="col-lg-12 reset-padding " style="height: 100%;">
			<p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-dark  space-inside-up-xs space-inside-down-sm  ">{{ attribute.translation }}</p>
		</div>

		<image-uploader  hidden='no' :identifier='identifier' v-if="attribute.multi === undefined " route="photo" :model_id="model_id" :type="type" ></image-uploader>

		<image-uploader  hidden='no' :identifier='identifier' v-if="attribute.multi == true " multi="true" route="photo" :model_id="model_id" :type="type" ></image-uploader>


		<overlay ask_confirm="true" confirm_message="Weet u zeker dat u de foto's zo op wilt slaan? "> 
			<div v-if="!loaded" class="text-center space-inside-xl">
				<svg  class="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
				   <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
				</svg>
			</div>

			<div v-show="loaded" class="col-lg-12 reset-padding">
					
				<h1 class="text-color-dark text-left text-uppercase letter-spacing-sm text-bold">Foto's bijsnijden </h1>
				<p class="space-inside-sm text-color-accent font-md"> 
					U heeft zojuist een foto geuploaded. Om de foto geschikt voor de website te maken, moet u deze nog even op maat snijden. Dat doet u hieronder.
					<br> <br>
					
				</p>
				<div class="col-lg-12 space-outside-down-lg">
					<!-- <tooltip> </tooltip> -->
				</div>

				<div>
					<div v-for="photo in photos" class="col-lg-12 reset-padding" >
					
						<image-display
							v-if="photos.length !== 0"
							
							:key="photo.id"
			                :id="photo.id"
			                :model_id="photo.model_id"
			                :type="photo.type"
			                :filename="photo.filename">
						</image-display>
						
						<div  :key="index" class="col-lg-6" v-for="(dimension, index) in attribute.dimensions">
							
							<cropper :dir="dimension" v-if="hideOther" route="cropper" :aspectheight="getAspectHeight(index)" :aspectwidth="getAspectWidth(index)" > </cropper>

						</div>
					</div>
					
				</div>
			</div>
		</overlay>

		<!-- A display to display the errors -->
		<validation-display  v-if="attribute.validation !== undefined" :errors="attribute.validation.errors"> </validation-display>
		
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			attributeName: null,
			attribute: null,
			type: null,
			model_id: null,
			identifier: null,
		}, 
		data() {
			return {
				photos: [],
				hideOther: false,
				loaded: false,
			}
		},
		mounted() {
			this.input = $('#' + this.attributeName + this.identifier)[0];

			this.registerEvents();
			
			if(!Validator.required(this.attribute.validation, this.input)) {
				Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
			} 
		},
		methods: {
			trackInput() {
				Event.fire('progressbar:increment:' + this.identifier, this.attributeName);
				Event.fire('input:updated:' + this.attributeName, this.input.value);
			},

			getAspectWidth(dimension){
				return dimension.split("x")[0];
			},

			getAspectHeight(dimension){
				return dimension.split("x")[1];
			},

			registerEvents() {
				// listen if the file has been uploaded
				Event.listen('file:ready', () => {
					Event.fire('progressbar:increment:' + this.identifier, this.attributeName);
				});

				Event.listen('overlay:closing', () => {
					this.hideSecond = true;
					setTimeout(() => {
						this.hideOther = false;
					}, 500)
					Notifier.success('Gelukt! De foto\'s zijn succesvol bijgesneden');
					
				});

				Event.listen('file:uploaded', (photo) => {
					this.photos = [];
					this.hideOther = true;
					setTimeout(() => {
						this.photos.push(photo);
					}, 300)
					this.loaded = true;
				});

				Event.listen('inputs:clear', () => {
					this.photos = [];
					if(!Validator.required(this.attribute.validation, this.input)) {
						Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
					} 
				});
			}
		}
	}
</script>