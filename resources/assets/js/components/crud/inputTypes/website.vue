<template>
	<!-- custom input type website -->

	<div @keyup.9.capture.prevent.stop v-if="attribute.type == 'website'" class="full-width">
	<div class="col-lg-12 reset-padding " style="height: 100%;">
		<p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-dark  space-inside-up-xs space-inside-down-sm ">{{ attribute.translation }}</p>
	</div>
	<p class="inline-block reset-padding space-inside-sides-md bg-tertiary text-color-light space-inside-sm">http://www.</p>
	<input 
		@keyup="trackInput()"
		style="width: 70%" 
		:id="attributeName + identifier"
		:placeholder="attribute.translation"
		class="
			reset-padding
			border border-secondary border-right-curved outline-none
			space-inside-sides-md space-inside-sm 
			inline-block 
			
			bg-secondary
			" 
	 type="text" :name="attributeName" >
	 <!-- A display to display the errors -->
	 <validation-display v-if="attribute.validation !== undefined" :errors="attribute.validation.errors"> </validation-display>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			attributeName: null,
			attribute: null,
			identifier: null,
		}, 
		data() {
			return {
				input: null,
			}
		},
		mounted() {
			// combine the hour and minutes input
			this.input = $('#' + this.attributeName + this.identifier)[0];

			// register the listeners
			this.registerListeners();

			// check if this input is required to be filled
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
			}
		}
	}
</script>