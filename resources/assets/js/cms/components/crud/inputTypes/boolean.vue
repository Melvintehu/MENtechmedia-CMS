<template>
<div class="space-inside-down-md">
	<div class="col-lg-12 reset-padding " style="height: 100%;">
		<p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-dark  space-inside-up-xs space-inside-down-sm">{{ attribute.translation }}</p>
	</div>

	<div class="col-lg-2 ">
						
			<p class="space-inside-down-xs">actief & inactief</p>

			<div class="checkboxOne">		
				<input 
					@change="trackInput()"
					v-model="selectedCheckBox"
					type="checkbox"  
					:id="attributeName + identifier" 
					:name="attributeName + identifier"
				/>
				<label :for="attributeName + identifier"> </label>
			</div>

	
	</div>

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
				input: null,
				loaded: false,
                selectedCheckBox: null,
			}
		},

		mounted() {
			this.registerListeners();

            this.initInputs();
            let value = this.selectedCheckBox ? 1 : 0;

            Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
            Event.fire('input:updated:' + this.attributeName,  value);
		},

		methods: {
            trackInput() {
         
                console.log(this.selectedCheckBox);

                let value = this.selectedCheckBox ? 1 : 0;

				Event.fire('input:updated:' + this.attributeName,  value);
			},

		

			registerListeners() {

				
				Event.listen('input:insertValues:' + this.identifier, () => {
					$('#' + this.attributeName + this.identifier)[0].value = this.value[this.attributeName];
					this.initInputs();

					// do validation
                    let value = this.selectedCheckBox ? 1 : 0;

					if(Validator.valid(this.attribute.validation,  value)) {
						Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
					}

				});

				// event for clearing the input
				Event.listen('inputs:clear', () => {
					this.selectedCheckBoxes = [];
					Event.fire('progressbar:increment:' + this.identifier, this.attributeName); 
				});

				
			},
            initInputs() {
                this.input = $('#' + this.attributeName + this.identifier)[0];
            },
		},

        

	}
</script>