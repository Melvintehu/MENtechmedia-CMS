<template>
<div class="space-inside-down-md">
	<div class="col-lg-12 reset-padding " style="height: 100%;">
		<p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-dark  space-inside-up-xs space-inside-down-sm">{{ attribute.translation }}</p>
	</div>

	<div v-if="checkboxes.length !== 0" v-for="checkbox in checkboxes" class="col-lg-2 ">
						
			<p class="space-inside-down-xs">{{checkbox.value}}</p>

			<div class="checkboxOne">		
				<input 
					@click="trackInput()"
					v-model="selectedCheckBoxes"
					type="checkbox"  
					:value="checkbox.id" 
					:id="checkbox.id + attributeName" 
					:name="attributeName"
				/>
				<label :for="checkbox.id + attributeName"> </label>
			</div>

	
	</div>

	<p class="space-inside-sides-sm text-danger text-bold font-md" v-if="checkboxes.length === 0">Geen {{ attribute.translation }} gevonden. Voeg eerst één toe. </p>

	<!-- A display to display the errors -->
	<validation-display  v-if="attribute.validation !== undefined" :errors="attribute.validation.errors"> </validation-display>
	
</div>
</template>
<style type="text/css">
	.checkboxOne {
		width: 40px;
		height: 10px;
		background: #F3A119;
		position: relative;
		border-radius: 3px;
	}


	/**
 * Create the slider from the label
 */
.checkboxOne label {
	display: block;
	width: 16px;
	height: 16px;
	border-radius: 50%;

	transition: all .5s ease;
	cursor: pointer;
	position: absolute;
	top: -3px;
	left: -3px;

	background: #F6F6F6; ;
}


.checkboxOne input[type=checkbox]:checked + label {
	left: 27px;
	background: #354052;
}



input[type=checkbox] {
	visibility: hidden;
}


</style>

<script type="text/javascript">

	require('../../../Objects');

	export default {
		props: {
			attributeName: null,
			attribute: null,
			identifier: null,
			value: "",
		},

		data() {
			return {
				checkboxes: [],
				select: null,
				loaded: false,
				selectedCheckBoxes: [],
			}
		},

		mounted() {
			this.registerListeners();

			Factory.getStaticInstance(this.attribute.model)
				   .all()
				   .then((objects) => {

						this.checkboxes = _.map(objects, (object) => {
							return {
								id: object.id,
								value: object[this.attribute.attributeDisplay]
							}
						});

					});

		},

		methods: {
	

			trackInput() {
				


				if(Validator.required(this.attribute.validation)) {
					if(this.selectedCheckBoxes.length > 0) {
						Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
						Event.fire('input:updated:' + this.attributeName, this.selectedCheckBoxes);

					} else {
						Event.fire('progressbar:decrement:' + this.identifier, this.attributeName);
					}
				}
			},


			registerListeners() {

				Event.listen('input:insertValues:' + this.identifier, () => {
					$('#'+ this.attributeName + this.identifier + ' option[value='+ this.value[this.attributeName] +']').attr('selected','selected');
				});

				// event for clearing the input
				Event.listen('inputs:clear', () => {
					this.selectedCheckBoxes = [];
					Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
				});

				
			}
		}
	}
</script>