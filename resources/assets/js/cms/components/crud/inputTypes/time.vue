<template>
	<div @keyup.9.capture.prevent.stop>
		<div class="col-lg-12 reset-padding " style="height: 100%;">
			<p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-dark  space-inside-up-xs space-inside-down-sm ">{{ attribute.translation }}</p>
		</div>
		
		<p  class="inline-block reset-padding space-inside-sides-md bg-tertiary text-color-light space-inside-sm">uur</p>
		<input @keyup="trackInput()" :id="'uur' + attributeName + identifier" class="
			reset-padding
			border border-secondary border-right-curved outline-none
			space-inside-sides-md space-inside-sm 
			inline-block 
			bg-secondary
			"  style="width: 10%" type="number" placeholder="uur" name="">
		<p class="inline-block reset-padding space-inside-sides-md bg-tertiary text-color-light space-inside-sm">minuten</p>
		<input  @keyup="trackInput()" :id="'minuten' + attributeName + identifier" class="
			reset-padding
			border border-secondary border-right-curved outline-none
			space-inside-sides-md space-inside-sm 
			inline-block 
			bg-secondary
			"  style="width: 10%" type="number" placeholder="minuten" name="">
		
		<input 
				:id="attributeName + identifier" 
				type="hidden"  
				:name="attributeName"
				v-model="finalTime"
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
				finalTime: null,
				hour: null,
				minutes: null,
			}
		},
		mounted() {
			// get a reference to the inputs
			this.hour = $('#uur' + this.attributeName + this.identifier)[0];
			this.minutes = $('#minuten' + this.attributeName + this.identifier)[0];

			// combine the hour and minutes input
			this.createFinalTime();

			// register the listeners
			this.registerListeners();

			// check if this input is required to be filled
			if(!Validator.required(this.attribute.validation, this.finalTime)) {
				Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
			} 
		},

		
		methods: {
			trackInput() {
				// combine the hour and minutes input
				this.createFinalTime();

				// do validation
				if(!Validator.valid(this.attribute.validation, this.finalTime)) {
					Event.fire('progressbar:decrement:' + this.identifier, this.attributeName);
					return; 
				}

				Event.fire('progressbar:increment:' + this.identifier, this.attributeName);
				Event.fire('input:updated:' + this.attributeName, this.finalTime);
			},

			registerListeners() {
				Event.listen('input:insertValues:' + this.identifier, () => {
					 let values = this.value[this.attributeName].split(":");
					 this.hour.value = values[0];
					 this.minutes.value = values[1];

					 // combine the hour and minutes input
					this.createFinalTime();
				});

				Event.listen('inputs:clear', () => {
					this.hour.value = "";
					this.minutes.value = "";
					
					if(!Validator.required(this.attribute.validation, this.finalTime)) {
						Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
					} 
				});

				Event.listen('validator:validate', () => {
					Validator.valid(this.attribute.validation, this.finalTime);
				});
			},

			createFinalTime() {
				if(this.hour.value === "" || this.minutes.value === "" ) {
					this.finalTime = "";
				} else {
					this.finalTime = this.hour.value + ':' + this.minutes.value;
				}
			},
		}
	}
</script>