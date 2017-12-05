<template>
<div>
	<div v-if="!visible && emptyData" class="text-center space-inside-xl">
			
		<svg  class="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="https://www.w3.org/2000/svg">
		   <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
		</svg>
	</div>



<transition name="fade">

	<div v-if="visible && Object.keys(data).length != 0" 
		 class="space-inside-sides-md space-outside-up-lg ">
			
			<div class="col-lg-12 reset-padding space-outside-down-md">
				<input @keyup="filterData" placeholder="Typ in dit zoekvak om te zoeken in de onderstaande gegevens." class="
						border border-secondary border-curved outline-none
						space-inside-sides-md space-inside-sm 
						inline-block 
						full-width
						text-color-light
						bg-main
						" />
			</div>

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
						<div > {{ needsToBeConverted(attribute, field) }} </div>

				</td>
				<!-- End of attributes -->


				<td @click="remove(field)"
					class="space-inside-sm space-inside-sides-sm"> 
					<i style="position: relative; top: 2px;" class="material-icons text-color-danger pointer">clear</i>
				</td>
				<td class="space-inside-sm space-inside-sides-sm"> 
			
					<a :href="'/cms/edit?type=' + type + '&id=' + field.id ">
						<i   class="material-icons pointer">mode_edit</i> 
					</a>
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
	import Search from '../../app/search/search';

	export default {
		props: {
			type: null
		},
		data() {
			return {
				object: Factory.getInstanceOf(this.type),
				data: null,
				referenceData: null,
				visible: false,
				emptyData: true,
				dropdowndata: {},
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
						   	this.dropdowndata[model] = data;
					   });
			});
			
		},

		methods: {

			/**
			* Filter by using a search function.
			 */
			filterData(event) {
				this.data = new Search().find(event.target.value, this.referenceData, this.object.fields);

				if(this.data.length === 0) {
					this.data = this.referenceData;
				}
				
			},

			getRelatedModels(model) {
				return _.filter(model.fields, (attribute, attributeName) => {
					if(_.indexOf(['model'], attribute.type) !== -1 ) {
						return true;
					}

				}).map((attribute) => {
					return attribute.model;
				});
			},

			needsToBeConverted(attribute, model) {

				if(this.attributeExists(attribute)) {

					if(this.object.fields[attribute].attributeDisplay !== undefined) {

						let displayAttribute = this.object.fields[attribute].attributeDisplay;
						let modelType = this.object.fields[attribute].model;

						for(let index in this.dropdowndata[modelType]) {
							let object = this.dropdowndata[modelType][index];
							
							if(object.id === model[attribute]) {
								return object[displayAttribute];
							}
						}
					}else {
						return model[attribute];
					}
				} 
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
							this.referenceData = data;

							if(Object.keys(data).length !== 0) {
								this.visible = true;
								this.emptyData = true;
							} else {
								this.emptyData = false;
							}

						});
				
			}, 



			remove(object) {
				Notifier.askConfirmation('Weet u zeker dat u dit wilt verwijderen ?', () => {
					console.log('werkt dit niet meer?');
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