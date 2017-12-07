<template>
	<div>

	
		<!-- Loading spinner -->
		<loading v-if="!loaded"></loading>

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

			<!-- progressbar -->
			<div class="col-lg-5">
				<progressbar :identifier='identifier' :totalInputs="totalInputs"> </progressbar>
			</div>


			<!-- Loop through all the attributes of a certain object -->

			<div v-for="(attribute, attributeName) in object.fields" class="col-lg-12 space-inside-xs reset-padding">
				<div class="row ">
				
					<!-- Each attribute has one input associated with it. You can find those inputs associations in every specific model. -->
					<div class="col-lg-12 reset-padding space-inside-left-xs">

						<crud-textarea :identifier="identifier" v-if="attribute.type == 'textarea'" :attributeName="attributeName" :attribute="attribute"> </crud-textarea>
						
						<!-- Render text input  -->
						<crud-text :identifier="identifier"	v-if="attribute.type === 'text'" :type="attribute.type" :name="attributeName" :attributeName="attributeName" :attribute="attribute"> </crud-text>

						<!-- Render text input  -->
						<crud-select :identifier="identifier" v-if="attribute.type == 'select'" :attributeName="attributeName" :attribute="attribute"> </crud-select>
						
						<!-- Render website input  -->
						<crud-website :identifier="identifier" v-if="attribute.type == 'website'" :attributeName="attributeName" :attribute="attribute"> </crud-website>

						<!-- Render youtube input  -->
						<crud-youtube :identifier="identifier" v-if="attribute.type == 'youtube'" :attributeName="attributeName" :attribute="attribute"> </crud-youtube>

						<!-- Render photo input  -->
						<crud-photo :identifier="identifier" v-if="attribute.type == 'photo'" :type="type" :attribute="attribute"> </crud-photo>

						<!-- Render date input  -->
						<crud-date :identifier="identifier" v-if="attribute.type == 'date'" :attributeName="attributeName" :attribute="attribute"> </crud-date>
						
						<!-- Render time input  -->
						<crud-time :identifier="identifier" v-if="attribute.type == 'time'" :attributeName="attributeName" :attribute="attribute"> </crud-time>
						
						<!-- Render model input  -->
						<crud-model :identifier="identifier" v-if="attribute.type == 'model'" :attributeName="attributeName" :attribute="attribute"> </crud-model>

						<!-- Render modelCheckbox input  -->
						<crud-model-checkbox :identifier="identifier" v-if="attribute.type == 'model_checkbox'" :attributeName="attributeName" :attribute="attribute"> </crud-model-checkbox>
						
						<!-- Render number input  -->
						<crud-number :identifier="identifier" v-if="attribute.type == 'number'" :attributeName="attributeName" :attribute="attribute" > </crud-number>

						<!-- Render boolean input  -->
						<crud-boolean :identifier="identifier" v-if="attribute.type == 'boolean'" :attributeName="attributeName" :attribute="attribute"></crud-boolean>
					</div>

				</div>
			</div>

			<!-- Button for persisting the input data to the database -->
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
				
				/**
				* Tell all inputs to do their validation, if any of those
				* inputs fail, then the data will not persist to the database.
				 */
				Event.fire('validator:validate');

				/**
				 * If validation has passed, than the data is persisted to the database.
				 */
				Event.listen('progressbar:complete:' + this.identifier, () => {	

					// tell the add component to persist values of the inputs to the database.
					Event.fire('input:save');

					// clear all the inputs of values
					Event.fire('progressbar:reset:' + this.identifier);
					Event.fire('inputs:clear');
					Notifier.success('Het toevoegen is gelukt!');
				});

				// TODO: WHY IS THIS HERE ? Checks if all validation has passed
				Event.fire('progressbar:isCompleted:' + this.identifier); // check if all fields are filled

				
			},

		}
	}
</script>