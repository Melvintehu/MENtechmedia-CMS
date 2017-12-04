<template>
<div>
	<div v-if="!visible && emptyData" class="text-center space-inside-xl">
			
		<svg  class="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
		   <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
		</svg>
	</div>


<transition name="fade">


<div 
	v-if="visible && Object.keys(data).length != 0" 
	class="space-inside-sides-md space-outside-up-lg ">


	<table v-if="data != null" class="table ">
		<tr>
			<th v-for="(attributeValue, attributeName ) in object.fields" 
				class="
					bg-tertiary 
					text-color-light font-md 
					space-inside-sm space-inside-sides-sm 
					"
			>{{ attributeValue.translation }}</th>

			<th class="
					bg-tertiary 
					text-color-light font-md 
					space-inside-sm space-inside-sides-sm 
					"> </th>

			<th class="
					bg-tertiary 
					text-color-light font-md 
					space-inside-sm space-inside-sides-sm 
					"> </th>
		</tr>

		<tr v-for="(field, key) in data" 
			class="
				space-inside-xs 
				border 
				bg-hover-secondary border-secondary 
				transition-normal 
				"
		>
			<!-- Attributes -->
			<td v-if="notHidden(attribute)"  
				class="space-inside-sm space-inside-sides-sm" 
				v-for="(value, attribute) in field">
					<div > {{ getValue(attribute, field) }} </div>

			</td>
			<!-- End of attributes -->


			<td @click="remove(field)"
				class="space-inside-sm space-inside-sides-sm"> 
				 <i style="position: relative; top: 2px;" class="material-icons text-color-danger pointer">clear</i>
			</td>
			<td 
				class="space-inside-sm space-inside-sides-sm"> 
				<input-renderer-update :object="object" :type="type" :value="field" :identifier="field.id"> </input-renderer-update>
			</td>
		</tr>


	</table>
</div>
</transition>



<transition name="fade"> 

<div v-if="data !== undefined">
	
	<div v-if="!emptyData" class="space-inside-sides-md space-outside-up-md">
		<p style="border-width: 3px;" class="circle border-secondary border inline-block space-inside-xs space-inside-sides-sm text-color-accent text-bold">U heeft nog niks toegevoegd. </p>
	</div>
</div>
</transition>

</div>
</template>

<style >
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0
	}
</style>


<script type="text/javascript">

	require('../../Objects');

	export default {
		props: {
			type: null
		},
		data() {
			return {
				object: Factory.getInstanceOf(this.type),
				data: null,
				visible: false,
				emptyData: true,
				relatedModels: {},
			}
		},
		mounted() {
			setTimeout(() => {

				this.loadData();

				Event.listen(this.type + ':added', () => {
					this.loadData();
				});

				Event.listen(this.type + ':updated', () => {
					this.loadData();
				});

				Event.listen(this.type + ':deleted', () => {
					this.loadData();
				});

			}, 500)
		},

		beforeMount() {
			let foundModel = Factory.getInstanceOf(this.type);
			let relatedModels = this.getRelatedModels(foundModel);
	
			_.each(relatedModels, (model) => {
				Factory.getStaticInstance(model)
					   .all()
					   .then((data) => {
						   	this.relatedModels[model] = data;
					   });
			});
			
		},

		methods: {
			getRelatedModels(model) {
				return _.filter(model.fields, (attribute, attributeName) => {
					if(_.indexOf(['model'], attribute.type) !== -1) return true;
				}).map((attribute) => {
					return attribute.model;
				});
			},

			getValue(attribute, model) {

				if(!this.attributeExists(attribute)) return;

				let attributeDisplay = this.object.fields[attribute].attributeDisplay;
				if(_.isUndefined(attributeDisplay)) return model[attribute];

				let id = attribute; // after the last if statement, 
				// we know that attribute is the attribute: id, on the related model

				let modelType = this.object.fields[id].model;
				return _.find(this.relatedModels[modelType], (object) => {
					return object.id === model[id];
				})[attributeDisplay];

			},

			notHidden(key) {
				return key in this.object.fields;
			},
			
			loadData() {
				this.visible = false;

				Factory.getStaticInstance(this.type)
					   .all()
					   .then((data) => {
							this.data = data;

							if(_.size(data) !== 0) {
								this.visible = true;
								this.emptyData = true;
								return;
							} 
							this.emptyData = false;
						});
				
			}, 

			remove(object) {
				Notifier.askConfirmation('Weet u zeker dat u dit wilt verwijderen ?', () => {
					object.delete(this.type, () => {
						setTimeout(() => {
							Event.fire(this.type + ':deleted');
							Notifier.success('Het verwijderen is gelukt!');
						}, 500);
					});
				});
			},

			presentPopover() {
				Event.fire('popover:present');
			},


			// ----------- BOOLEAN FUNCTIONS ----------- //
			attributeExists(attribute) {
				return this.object.fields[attribute] !== undefined;
			},
		}
	}

</script>