<template>
    <div>
    <multi-image-uploader :type="type">  </multi-image-uploader>
    </div>
</template>

<script>
    import MultiPhotoInputController from '../../../app/inputController/multiPhotoInputController';

    export default {
        props: {
            type: null,
            attributeName: null,
            attribute: null,
            value: "null",
        },

        data() {
            return {

            }
        }, 

        mounted() {
            this.inputController = new MultiPhotoInputController(this.attributeName, this.attribute, this.value);
        },

        methods: {
            
        }
    }    
</script>