 <template>
 	<div>
 		<input-renderer :identifier="identifier" :type="type" :object="object"> 
 			<slot> </slot>
 		</input-renderer>
 	</div>
 </template>

 <script type="text/javascript">


 	require('../../Objects');

 	export default {

		props: {
			type: null,
		},

		data() {
			return {
				object: Factory.getInstanceOf(this.type),
				objectValue: Factory.getInstanceOf(this.type),
				identifier: 'add',
			}
		},
		mounted() {
			this.registerListeners();

			Event.listen('input:save', () => {
				this.save();
			});

		}, 

		methods: {

			registerListeners() {

				let attributeExceptions = [
					'photo',
					'id',
				];

				_.each(this.object.fields, (attribute, attributeName) => {
					if(_.indexOf(attributeExceptions, attribute.type) === -1) {
						Event.listen('input:updated:' + attributeName, (value) => {
							this.objectValue[attributeName] = value;
						});
					}
				});

			},

			save() {
				// delete this.objectValue.fields
				this.objectValue.save().then((object) => {
					Event.fire(this.type + ':added', object.id);
				});
			
			}
		}
 	}
 </script>