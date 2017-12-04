<template>
<div>
	<div class="col-lg-12 reset-padding " style="height: 100%;">
		<p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-dark  space-inside-up-xs space-inside-down-sm ">{{ attribute.translation }}</p>
	</div>

	<!-- select input -->
	<select @change="trackInput()" style="height: 50px" :id="attributeName + identifier"  class="border-curved space-inside-xs outline-none text-color-accent space-inside-sides-sm full-width border-secondary bg-secondary border" v-if="attribute.type == 'model'">
		<option v-for="optionValue in optionValues"  :value="optionValue.id" >{{ optionValue.value }}</option>
	</select>

	<!-- A display to display the errors -->
	 <validation-display  v-if="attribute.validation !== undefined" :errors="attribute.validation.errors"> </validation-display>


</div>
</template>


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
				optionValues: [],
				select: null,
				loaded: false,
			}
		},

		mounted() {
			this.registerListeners();
			
			Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
		


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

							setTimeout(() => {
								this.init();							
								this.trackInput();
							}, 500)
						});

			});

		},

		methods: {
			init() {
				let selector = '#' + this.attributeName + this.identifier;
				this.select = $(selector + ' option:selected' );
				this.loaded = true;	
			},

			trackInput() {
				let select = $('#' + this.attributeName + this.identifier)[0];
				Event.fire('input:updated:' + this.attributeName, select.value);
			},

			registerListeners() {

				Event.listen('input:insertValues:' + this.identifier, () => {
					$('#'+ this.attributeName + this.identifier + ' option[value='+ this.value[this.attributeName] +']').attr('selected','selected');
				});

				// event for clearing the input
				Event.listen('inputs:clear', () => {
					Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
				});

				
			}
		}
	}
</script>