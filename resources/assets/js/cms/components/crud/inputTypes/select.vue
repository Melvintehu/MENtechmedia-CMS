<template>
<div @keyup.9.capture.prevent.stop>

	<attribute-title :attribute="attribute"></attribute-title>

	<!-- select input -->
	<select  style="height: 50px" :id="attributeName + identifier" @change="trackInput()" class="border-curved space-inside-xs outline-none text-color-accent space-inside-sides-sm space-inside-md full-width border-secondary bg-secondary border" v-if="attribute.type == 'select'">
		<option v-for="optionValue in attribute.values"  :value="optionValue.id" >{{ optionValue.value }}</option>
	</select>

	 <!-- A display to display the errors -->
	 <validation-display  v-if="attribute.validation !== undefined" :errors="attribute.validation.errors"> </validation-display>
</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			attributeName: null,
			attribute: null,
			identifier: null,
			value: "",
		}, 
		data() {
			return {
				input: null,
			}
		},
		mounted() {
			// get a reference to the input
			this.input = $('#' + this.attributeName + this.identifier)[0];

			// register the listeners
			this.registerListeners();
			
			setTimeout(() => {
				this.trackInput();
			}, 300)

			
			if(!Validator.required(this.attribute.validation, this.input.value)) {
				Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
			} 
		},
		methods: {
			trackInput() {
				
				// do validation
				if(!Validator.valid(this.attribute.validation, this.input.value)) {
					Event.fire('progressbar:decrement:' + this.identifier, this.attributeName);
					return; 
				}

				Event.fire('progressbar:increment:' + this.identifier, this.attributeName);
				Event.fire('input:updated:' + this.attributeName, this.input.value);
			},

			registerListeners() {

				Event.listen('input:insertValues:' + this.identifier, () => {
					$('#' + this.attributeName + this.identifier)[0].value = this.value[this.attributeName];
				});

				// event for clearing the input
				Event.listen('inputs:clear', () => {
					

					// check if this field has validation, if not increment the progressbar
					if(!Validator.required(this.attribute.validation, this.input.value)) {
						Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
					} 
				});

				// validate when the user clicks the add button
				Event.listen('validator:validate', () => {
					Validator.valid(this.attribute.validation, this.input.value);
				});

			}
		}
	}
</script>