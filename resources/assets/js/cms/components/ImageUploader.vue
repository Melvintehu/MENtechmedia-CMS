<template>
<div class="container">
    <div class="row ">
        <slot></slot>
        <div class="col-lg-12">
            <slot name="description"> </slot>
        </div>

      
        <div style="max-width: 100%; min-width: 100%;" :id="identifier" v-if="hidden === 'no'" class="col-lg-12 dropzone no-overflow">
            
        </div>
    </div>
</div>
</template>

<style type="text/css">
    img {
        max-width: 100%;
    }
</style>

<script>
import Uploader from '../App/Uploader';

    export default {
        props: {
            hidden: null,
            route: "",
            model_id: "",
            type: "",
            multi: "",
            photo_id: "",
            identifier: null
        },
        data() {
            return {
                image: null,
                fileInput: null,
                croppedImage: null,
                cropper: null,
                displayCrop: false,
                photo: null,
                uploader: null,
                csrf: Laravel.csrfToken
            }
        },

        created() {
            
        },
        mounted() {
            this.uploader = new Uploader(this.identifier);


            Event.listen(this.type.toLowerCase() + ":added", (model_id) => {

                this.uploader.processQueue(model_id, this.type.toLowerCase());
            });
        },

        methods: {
          success() {

          }
        },

    }
</script>
