<template>
    <div >

        <!-- Operations -->
        <div class="col-lg-3 space-outside-down-lg">
            <div >

                <!-- create a new folder -->
                <div class="transition-normal border-curved bg-secondary operationButton bg-hover-main inline-block 
                space-inside-sm space-inside-sides-sm  pointer">
                    <i class="material-icons text-color-accent">create_new_folder</i>
                </div>

                <!-- create a new file -->
                <div class="transition-normal border-curved bg-secondary operationButton bg-hover-main inline-block 
                space-inside-sm space-inside-sides-sm  pointer">
                    <i class="material-icons text-color-accent">file_download</i>
                </div>

            </div>
        </div>

        <!-- Directories -->
        <div class="col-lg-12">
            <div class="row space-inside-down-md">

                <folder name="Facturen" ></folder>
                <folder name="Projecten" ></folder>
                <folder name="Offertes" ></folder>
                <folder name="Code snippets" ></folder>
                <folder name="TODO Lijsten" ></folder>

            </div>
        </div>
    </div>
</template>

<style>
    
    .square {
        position: relative;
    }

    .folder-name {
        position: absolute;
        bottom: 0px;
        left: 0px;
    }

    .operationButton {
        line-height: 10px;
    }

    .operationButton:hover > i{
        color: white !important;
    }

    .square:hover > .folder-name {
        background: #354052;
        color: white;
    }
   
</style>

<script>
   
    export default {
        props: {

        },

        data() {
            return {
                active: false,
                root: null,
            }
        }, 

        mounted() {
            
            Factory.getStaticInstance('folder').find([
                ['name', '=', 'root']
            ]).then((rootFolder) => {
                this.root = rootFolder;
                console.log(this.root);
            });

            $(document).ready(function() {
                $(window).resize(function(){
                    // If there are multiple elements with the same class, "main"
                    $('.square').each(function() {
                        $(this).height($(this).width());
                    });

                    $(function() {
                        $('.icon').css({
                            'position' : 'absolute',
                            'left' : '50%',
                            'top' : '50%',
                            'margin-left' : -$('.icon').outerWidth()/2,
                            'margin-top' : -$('.icon').outerHeight()/2
                        });
                    });


                }).resize();



            });

        },

        methods: {
            
        }
    }    
</script>