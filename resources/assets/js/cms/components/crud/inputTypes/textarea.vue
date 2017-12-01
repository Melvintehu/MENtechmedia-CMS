<template>
<div @keyup.9.capture.prevent.stop>
	<div class="col-lg-12 reset-padding " style="height: 100%;">
		<p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-dark  space-inside-up-xs space-inside-down-sm ">{{ attribute.translation }}</p>
	</div>
	<textarea
		
		@keyup="trackInput()"
		:id="attributeName + identifier"
		

		class="
			border border-secondary border-curved outline-none
			space-inside-sides-md space-inside-sm
			inline-block
			bg-secondary
			" :placeholder="attribute.translation" style="height: 150px; width: 100%; resize: none;"  :name="attributeName"  required></textarea>
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
			value: null,
		}, 
		data() {
			return {
				fired: false,
				textarea: null,
			}
		},
		mounted() {
			// get a reference to the inputs
			this.initInputs();

			// register the listeners
			this.registerListeners();
			
			// check if this input is required to be filled
			if(!Validator.required(this.attribute.validation, this.textarea.value)) {
				Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
			} 
		},
		methods: {
			trackInput(event) {
				// do validation

				if(!Validator.valid(this.attribute.validation, this.textarea.value)) {
					Event.fire('progressbar:decrement:' + this.identifier, this.attributeName);
					return; 
				}

				Event.fire('progressbar:increment:' + this.identifier, this.attributeName);
				Event.fire('input:updated:' + this.attributeName, this.textarea.value);
			},

			registerListeners() {

				Event.listen('input:insertValues:' + this.identifier, () => {
					$('#' + this.attributeName + this.identifier)[0].value = this.value[this.attributeName];

					// do validation
					if(Validator.valid(this.attribute.validation, this.textarea.value)) {
						Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
					}

				});

				// event for clearing the input
				Event.listen('inputs:clear', () => {
					this.textarea.value = "";

					if(!Validator.required(this.attribute.validation, this.textarea.value)) {
						Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
					} 
				});

				Event.listen('validator:validate', () => {
					Validator.valid(this.attribute.validation, this.textarea.value);
				});
			},
			initInputs() {
				this.textarea = $('#' + this.attributeName + this.identifier)[0];
			},

			
		}
	}
</script>