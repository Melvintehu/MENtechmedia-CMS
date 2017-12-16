<template>
<div class="bg-light space-inside-sides-sm">

    <!-- CONTENT HERE -->

    <!-- Loading spinner -->
    <loading v-if="!loaded"></loading>

    <div v-show="loaded">

        <!-- title -->
        <div class="col-lg-6 reset-padding space-inside-md" >
            <h1 class="text-color-dark text-left text-uppercase letter-spacing-sm text-bold">Aanpassen</h1>
            <p class="space-inside-sm text-color-accent">
                <slot> 
                pas hier dit item aan.
                </slot>
            </p>
        </div>

        <!-- progressbar -->
        <div class="col-lg-6">
            <transition name="fade">
                <progressbar :progressBar="progressBar" :identifier='identifier' :totalInputs="totalInputs"> </progressbar>
            </transition>
        </div>

        <!-- Inputs -->


        <!-- End of inputs -->
        <div v-if="object !== null && object !== undefined">
       
                
            <div  v-for="(attribute, attributeName) in object.fields" class="col-lg-12 space-inside-xs reset-padding">
           
                <!-- display a text input if the type is text -->
                <crud-text 
                    :identifier="identifier"    
                    :value="innerValue"
                    v-if="
                        attribute.type == 'text' 
                    " 
                    :type="attribute.type" 
                    :attributeName="attributeName" 
                    :attribute="attribute"> 
                </crud-text>
                <!-- end of text input -->

                <!-- display a textarea input if the type is textarea -->
                <crud-textarea 
                    v-if="attribute.type == 'textarea'" 

                    :value="innerValue"
                    :identifier="identifier" 
                    :attributeName="attributeName" 
                    :attribute="attribute"> 
                </crud-textarea>
                <!-- end of textarea input -->

                <!-- display a text input if the type is text -->
                <crud-number 
                    :identifier="identifier"    
                    :value="innerValue"
                    v-if="
                        attribute.type === 'number'
                    " 
                    :type="attribute.type" 
                    :attributeName="attributeName" 
                    :attribute="attribute"> 
                </crud-number>
                <!-- end of text input -->

                <crud-youtube :identifier="identifier"    
                    :value="innerValue"
                    v-if="
                        attribute.type === 'youtube'
                    " 
                    :type="attribute.type" 
                    :attributeName="attributeName" 
                    :attribute="attribute"> 
                </crud-youtube>

                <!-- display a text input if the type is text -->
                <crud-select 
                    v-if="attribute.type == 'select'" 
                    :identifier="identifier" 
                    :attributeName="attributeName" 
                    :value="innerValue"
                    :attribute="attribute"> 
                </crud-select>
                <!-- end of text input -->

                <crud-model 
                    v-if="attribute.type == 'model'" 
                    :value="innerValue"
                    :identifier="identifier" 
                    :attributeName="attributeName" 
                    :attribute="attribute"> 
                </crud-model>


                <crud-date 
                    :identifier="identifier" 
                    v-if="attribute.type == 'date'" 
                    :attributeName="attributeName" 
                    :value="innerValue"
                    :attribute="attribute"> 
                </crud-date>



                <crud-time 
                    v-if="attribute.type == 'time'" 
                    :identifier="identifier" 
                    :attributeName="attributeName" 
                    :value="innerValue"
                    :attribute="attribute"> 
                </crud-time>

                <crud-photo  
                    v-if="attribute.type == 'photo'"
                    :updateMode="true"
                    :identifier="identifier"  
                    :model_id="id" 
                    :type="type" 
                    :attributeName="attributeName" 
                    :attribute="attribute"> 
                </crud-photo>

            </div>
        </div>

        <div v-if="innerValue !== null && innerValue.original !== undefined && innerValue.original !== '' && innerValue.original !== null " 
            class="col-lg-4 space-outside-up-lg reset-padding bg-main">
                <p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-light  space-inside-sm space-inside-sides-sm ">De bijhorende foto</p>
                <img style="width: 100%;" :src="innerValue.original">
        </div>

        <!-- END OF CONTENT -->
        <div class="col-lg-12 space-inside-sides-xs space-inside-up-sm">
            <button  @click="update()" class=" inline-block border-none outline-none bg-main shadow-xs text-color-light space-inside-sm space-inside-sides-md">Aanpassen</button>
            <button class="
                    bg-tertiary 
                    space-inside-sides-md space-inside-sm 
                    space-outside-sides-sm
                    border-none
                    text-color-light
                    shadow-xs
                    "    onclick="window.history.back()">Terug naar overzicht</button>
        </div>
    
    </div>

</div>
</template>

<style type="text/css">
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0
    }
</style>


<script type="text/javascript">
    import ProgressBar from '../../app/ProgressBar/ProgressBar';

    export default {
        props: {
            value: null,
            type: null,
            identifier: null,
            id: null,
        },

        data() {
            return {
                object: null,
                hidden: true,
                totalInputs: 0,
                model_id: null,
                loaded: false,
                innerValue: null,

                progressBar: null,
            }
        }, 
        mounted() {
            this.object = Factory.getInstanceOf(this.type);
            this.innerValue = JSON.parse(this.value);
            this.totalInputs = Object.keys(this.object.fields).length;

            // init progress bar
            this.progressBar = new ProgressBar(this.totalInputs);
                
            this.broadcastProgressBar();
            this.registerListeners();


            setTimeout(() => {
                Event.fire('input:insertValues');
            }, 200);

            setTimeout(() => {
                this.loaded = true;
             

              
            }, 500);
        },

        methods: {

            /**
			 * Broadcast to all inputs that there is a progressBar, send the progressBar to all inputs.
			 */
			broadcastProgressBar() {
				setTimeout(() => {
					_.forEach(this.object.fields, (attribute, attributeName) => {
						Event.fire('progressBar:get:' + attributeName, this.progressBar);
					});
				});
			},


            registerListeners() {
                let attributeExceptions = [
					'photo',
                    'id',
				];

                _.each(this.object.fields, (attribute, attributeName) => {
					if(_.indexOf(attributeExceptions, attribute.type) === -1) {
						Event.listen('input:updated:' + attributeName, (value) => {
							this.object[attributeName] = value;
						});
					}
				});
            },

            update() {
                this.object.id = this.innerValue.id;

                this.object.update().then((data) => {
                    Event.fire(this.type.toLowerCase() + ':updated');
                    Notifier.success('Het is gelukt! Aangepast')
                    Event.fire(this.type.toLowerCase() + ':added', this.id);
                });
            },
        }
    }
</script>