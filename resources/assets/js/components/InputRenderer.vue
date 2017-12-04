<template>
	<div>
		<div v-if="!loaded" class="text-center space-inside-xl">
				
			<svg  class="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
			   <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
			</svg>
		</div>
		<div v-if="loaded" >
			
			<!-- Title -->

			<div class="col-lg-7 reset-padding space-inside-md" >
				<h1 class="text-color-dark text-left text-uppercase letter-spacing-sm text-bold">Toevoegen</h1>
				<p class="space-inside-sm text-color-accent">
					<slot> 
					U kunt hier een nieuw item toevoegen.
					</slot>
				</p>
			</div>

			<!-- end of title -->



			<!-- progressbar -->

			<div class="col-lg-5">
				<progressbar :identifier='identifier' :totalInputs="totalInputs"> </progressbar>
			</div>

			<!-- Progressbar end -->

			<!-- Inputs -->
			<div v-for="(attribute, attributeName) in object.fields" class="col-lg-12 space-inside-xs reset-padding">

				<div class="row ">
				
					
					
					<div class="col-lg-12 reset-padding space-inside-left-xs">

						<crud-textarea :identifier="identifier" v-if="attribute.type == 'textarea'" :attributeName="attributeName" :attribute="attribute"> </crud-textarea>
						<crud-text 
								:identifier="identifier"	
								v-if="
									attribute.type === 'text'
								" 

								:type="attribute.type" 
								:name="attributeName" 
								:attributeName="attributeName" 
								:attribute="attribute"> </crud-text>

						<crud-select :identifier="identifier" v-if="attribute.type == 'select'" :attributeName="attributeName" :attribute="attribute"> </crud-select>
						<crud-website :identifier="identifier" v-if="attribute.type == 'website'" :attributeName="attributeName" :attribute="attribute"> </crud-website>
						<crud-photo :identifier="identifier" v-if="attribute.type == 'photo'" :model_id="model_id" :type="type" :attributeName="attributeName" :attribute="attribute"> </crud-photo>
						<crud-date :identifier="identifier" v-if="attribute.type == 'date'" :attributeName="attributeName" :attribute="attribute"> </crud-date>
						<crud-time :identifier="identifier" v-if="attribute.type == 'time'" :attributeName="attributeName" :attribute="attribute"> </crud-time>
						
						<crud-model :identifier="identifier" v-if="attribute.type == 'model'" :attributeName="attributeName" :attribute="attribute"> </crud-model>

						<crud-model-checkbox :identifier="identifier" v-if="attribute.type == 'model_checkbox'" :attributeName="attributeName" :attribute="attribute"> </crud-model-checkbox>

						<crud-number :identifier="identifier" v-if="attribute.type == 'number'" :attributeName="attributeName" :attribute="attribute" > </crud-number>

					</div>
				</div>
			</div>
			<!-- End of inputs -->

			<div class="row">
				<div class="col-lg-12 space-inside-sides-xs space-inside-up-sm">
					<button  @click="save()" class="border-none outline-none bg-main shadow-xs text-color-light space-inside-sm space-inside-sides-md">Toevoegen</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style type="text/css">
	.width-over-time {
		-webkit-transition: all .5s; /* Safari */
	    transition: all .5s;
	}
</style>

<script type="text/javascript" >
	
	export default {
		props: {
			object: null,
			type: null,
			identifier: null,
		},
		data() {
			return {
				totalInputs: Object.keys(this.object.fields).length,
				model_id: null,
				loaded: false,
			}
		}, 
		mounted() {
			
			setTimeout(() => {
				this.loaded = true;
			}, 700)

		},
		methods: {
			save() {
				// if the progressbar is incomplete, validate the inputs and notify the user what went wrong.
				Event.fire('validator:validate');

				// listen if the validator has passed
				Event.listen('progressbar:complete:' + this.identifier, () => {	

					// tell the crud system to save the values to the database
					Event.fire('input:save');

					// clear all the inputs of values
					Event.fire('progressbar:reset:' + this.identifier);
					Event.fire('inputs:clear');
					Notifier.success('Het toevoegen is gelukt!');
				});

				Event.listen(this.type + ':added', (model_id) => {
					this.model_id = model_id;
					Event.fire(this.type + ':upload:ready', model_id);
				});

				// check if no fields are empty. The progressbar component provides us with 
				Event.fire('progressbar:isCompleted:' + this.identifier); // check if all fields are filled

				
			},

		}
	}
</script>