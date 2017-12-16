<template>
<div v-if="inputController !== null" @keyup.9.capture.prevent.stop>

	<!-- Attribute title and walkThrough -->
	<attribute-title :attribute="attribute"></attribute-title>

	<input 
		type="number"
		@keyup="inputController.trackInput()"
		:id="attributeName + identifier"
		v-model="inputController.input"
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