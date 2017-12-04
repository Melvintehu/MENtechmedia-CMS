<template>
	<!-- custom input type website -->

	<div v-if="inputController !== null" @keyup.9.capture.prevent.stop class="full-width">
		<div class="col-lg-12 reset-padding " style="height: 100%;">
			<p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-dark  space-inside-up-xs space-inside-down-sm ">{{ attribute.translation }}</p>
		</div>
		
		<p class="inline-block reset-padding space-inside-sides-md bg-tertiary text-color-light space-inside-sm">www.</p>
		<input 
			@keyup="inputController.trackInput();"
			:id="attributeName + identifier"
			:placeholder="attribute.translation"
			v-model="inputController.input"
			
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
	import InputController from '../../../app/inputController/inputController';

	export default {
		props: {
			attributeName: null,
			attribute: null,
			identifier: null,
			value: "",
		}, 

		data() {
			return {
				inputController: null,
			}
		},

		mounted() {
			this.inputController = new InputController(this.attributeName, this.attribute, this.identifier, this.value);
		},

	}
</script>