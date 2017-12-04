<template>
	<div @keyup.9.capture.prevent.stop>
		
		<div class="col-lg-12 reset-padding " style="height: 100%;">
			<p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-dark  space-inside-up-xs space-inside-down-sm ">{{ attribute.translation }} 
				<span class="text-color-accent font-xs space-inside-left-md" v-if="required === false">(niet verplicht)</span>
			</p>
		</div>

		<p min="1" max="31" class="inline-block reset-padding space-inside-sides-md bg-tertiary text-color-light space-inside-sm">dag</p>
		<input @keyup="trackInput()" :id="'dag' + attributeName + identifier" class="
			reset-padding
			border border-secondary border-right-curved outline-none
			space-inside-sides-md space-inside-sm 
			inline-block 
			
			bg-secondary
			"  style="width: 10%" type="number" placeholder="dag" name="">
		<p class="inline-block reset-padding space-inside-sides-md bg-tertiary text-color-light space-inside-sm">maand</p>
		<input min="1" max="12" @keyup="trackInput()" :id="'maand' + attributeName + identifier" class="
			reset-padding
			border border-secondary border-right-curved outline-none
			space-inside-sides-md space-inside-sm 
			inline-block 
			
			bg-secondary
			"  style="width: 10%" type="number" placeholder="maand" name="">
		<p class="inline-block reset-padding space-inside-sides-md bg-tertiary text-color-light space-inside-sm">jaar</p>
		<input  @keyup="trackInput()" :id="'jaar' + attributeName + identifier" class="
			reset-padding
			border border-secondary border-right-curved outline-none
			space-inside-sides-md space-inside-sm 
			inline-block 
			
			bg-secondary
			"  style="width: 10%" type="number" placeholder="jaar" name="">

			<input 
				:id="attributeName + identifier" 
				type="hidden"  
				:name="attributeName"
				v-model="finalDate"
			>

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
				fired: false,
				finalDate: null,
				dag: null,
				maand: null,
				jaar: null,
				required: null
			}
		},
		mounted() {
			this.dag = $('#dag' + this.attributeName + this.identifier)[0];
			this.maand = $('#maand' + this.attributeName + this.identifier)[0];
			this.jaar = $('#jaar' + this.attributeName + this.identifier)[0];
			
			this.createFinalDate();

			this.registerListeners();

			if(!Validator.required(this.attribute.validation)) {
				this.required = false;
				Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
			} 
		},

		
		methods: {
			trackInput() {
				this.createFinalDate();
				
				// do validation
				if(!Validator.valid(this.attribute.validation, this.finalDate)) {
					Event.fire('progressbar:decrement:' + this.identifier, this.attributeName);
					return; 
				}

				Event.fire('progressbar:increment:' + this.identifier, this.attributeName);
				Event.fire('input:updated:' + this.attributeName, this.finalDate);
			},

			registerListeners() {
				Event.listen('input:insertValues:' + this.identifier, () => {
					 let values = this.value[this.attributeName].split("-");

					 this.jaar.value = values[0];
					 this.maand.value = values[1];
					 this.dag.value = values[2]

					 this.createFinalDate();
				});

				Event.listen('inputs:clear', () => {
					this.dag.value = "";
					this.maand.value = "";
					this.jaar.value = "";
				});

				// if this attribute is not required then tell the progressbar to
				// respresent this 
				Event.listen('progress:reset:' + this.identifier, () => {
					if(!Validator.required(this.attribute.validation)) {
						Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
					}
				});

				Event.listen('validator:validate', () => {
					Validator.valid(this.attribute.validation, this.finalDate);
				});
			},
			
			createFinalDate() {
				if(this.dag.value === "" || this.maand.value === "" || this.jaar.value === "") {
					this.finalDate = "";
				} else {
					this.finalDate = this.jaar.value + '-' + this.maand.value + '-' + this.dag.value;
				}
			},
		}
	}
</script>