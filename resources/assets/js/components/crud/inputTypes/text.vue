<template>
<div @keyup.9.capture.prevent.stop>

	<div class="col-lg-12 reset-padding " style="height: 100%;">
		<p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-dark  space-inside-up-xs space-inside-down-sm ">{{ attribute.translation }}</p>
	</div>

	<input 
		@keyup="trackInput()"
		:id="attributeName + identifier"
		:placeholder="attribute.translation"

		

		class="
			border border-secondary border-curved outline-none
			space-inside-sides-md space-inside-sm 
			inline-block 
			full-width
			bg-secondary
			" 
	 required>
	 
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
			this.initInputs();

			this.registerListeners();
			
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
					this.initInputs();

					// do validation
					if(Validator.valid(this.attribute.validation, this.input.value)) {
						Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
					}

				});

				// event for clearing the input
				Event.listen('inputs:clear', () => {
					this.input.value = "";


					if(!Validator.required(this.attribute.validation, this.input.value)) {
						Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
					} 
				});

				Event.listen('validator:validate', () => {
					Validator.valid(this.attribute.validation, this.input.value);
				});
			},

			initInputs() {
				this.input = $('#' + this.attributeName + this.identifier)[0];
			},



		}
	}
</script>