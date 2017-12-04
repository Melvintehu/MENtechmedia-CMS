<template>
<div>
    <i @click="show()"  class="material-icons pointer">mode_edit</i> 

    <transition name="fade">
        <div v-show="hidden === false" style="position:fixed;top:0; left: 0;bottom: 0; right: 0; background: rgba(0,0,0,.7); z-index: 2000;">
            
            <div class="vertical-scrollbar"   style="z-index: 2000;width: 75%;
                position: fixed;
                top: 5%;
                left: 55%;
                max-height: 90%;
                margin-left: -37.5%;  ">
                <div  class="bg-light shadow-xs no-overflow col-lg-12 space-inside-sides-xl space-inside-lg" >
                    <span class="right  block" @click="hide()">
                    <i class="material-icons text-color-danger pointer">clear</i></span>


                    <!-- CONTENT HERE -->

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
                        <progressbar :identifier='identifier' :totalInputs="totalInputs"> </progressbar>
                    </div>

                    <!-- Inputs -->


                    <!-- End of inputs -->
                    <div v-for="(attribute, attributeName) in object.fields" class="col-lg-12 space-inside-xs reset-padding">
                   
                    <!-- display a text input if the type is text -->
                    <crud-text 
                        :identifier="identifier"    
                        :value="value"
                        v-if="
                            attribute.type != 'textarea' && 
                            attribute.type != 'select' && 
                            attribute.type != 'website' &&
                            attribute.type != 'photo' &&
                            attribute.type != 'date' &&
                            attribute.type != 'time' &&
                            attribute.type != 'model' &&
                            attribute.type != 'number'
                        " 
                        :type="attribute.type" 
                        :attributeName="attributeName" 
                        :attribute="attribute"> 
                    </crud-text>
                    <!-- end of text input -->

                    <!-- display a textarea input if the type is textarea -->
                    <crud-textarea 
                        v-if="attribute.type == 'textarea'" 

                        :value="value"
                        :identifier="identifier" 
                        :attributeName="attributeName" 
                        :attribute="attribute"> 
                    </crud-textarea>
                    <!-- end of textarea input -->

                    <!-- display a text input if the type is text -->
                    <crud-number 
                        :identifier="identifier"    
                        :value="value"
                        v-if="
                            attribute.type === 'number'
                        " 
                        :type="attribute.type" 
                        :attributeName="attributeName" 
                        :attribute="attribute"> 
                    </crud-number>
                    <!-- end of text input -->

                    <!-- display a text input if the type is text -->
                    <crud-select 
                        v-if="attribute.type == 'select'" 
                        :identifier="identifier" 
                        :attributeName="attributeName" 
                        :value="value"
                        :attribute="attribute"> 
                    </crud-select>
                    <!-- end of text input -->

                    <crud-model 
                        v-if="attribute.type == 'model'" 
                        :value="value"
                        :identifier="identifier" 
                        :attributeName="attributeName" 
                        :attribute="attribute"> 
                    </crud-model>


                    <crud-date 
                        :identifier="identifier" 
                        v-if="attribute.type == 'date'" 
                        :attributeName="attributeName" 
                        :value="value"
                        :attribute="attribute"> 
                    </crud-date>



                    <crud-time 
                        v-if="attribute.type == 'time'" 
                        :identifier="identifier" 
                        :attributeName="attributeName" 
                        :value="value"
                        :attribute="attribute"> 
                    </crud-time>

                    
                    <!-- <crud-photo :identifier="'update-' + identifier" v-if="attribute.type == 'photo'" :model_id="model_id" :type="type" :attributeName="attributeName" :attribute="attribute"> </crud-photo>
 -->
                    </div>

                    <div v-if="value.original !== '' && value.original !== null " class="col-lg-12 space-outside-up-lg reset-padding bg-main">

                       <div class="col-lg-12 reset-padding " style="height: 100%;">
                            <p style="width: 100%; height: 100%;text-transform: capitalize" class="font-sm  text-bold inline-block  text-color-light  space-inside-sm space-inside-sides-sm ">De bijhorende foto</p>
                        </div>

                        <img :src="value.original">
                    </div>



                    <!-- END OF CONTENT -->
                   
                    <div class="col-lg-12 space-inside-sides-xs space-inside-up-sm">
                        <button  @click="update()" class="border-none outline-none bg-main shadow-xs text-color-light space-inside-sm space-inside-sides-md">Aanpassen</button>
                    </div>
           
                </div>
            </div>
        </div>
    </transition>
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
    export default {
        props: {
            object: null,
            value: null,
            type: null,
            identifier: null,
        },

        data() {
            return {
                hidden: true,
                totalInputs: Object.keys(this.object.fields).length,
                model_id: null,
                loaded: false,
                
            }
        }, 
        mounted() {
            console.log(this.value);
        },
        methods: {
           
            show() {
                Event.fire('input:insertValues:' + this.identifier);
                this.hidden = false;
            },

            hide() {
                Event.fire('input:insertValues:' + this.identifier);
                this.hidden = true;
            },

            update() {
                let object = Factory.getInstanceOf(this.type);


                _.each(this.value, (value, attribute) => {
                    if(this.object.fields[attribute] !== undefined) {
                        object[attribute] = $('#' + attribute + this.identifier)[0].value;
                    } else {
                        object[attribute] = this.value[attribute];
                    }
                });

                delete object.fields

                object.update(this.type, () => {
                    Event.fire(this.type + ':updated');
                    Notifier.success('Het is gelukt! Aangepast!');
                });
            },
        }
    }
</script>