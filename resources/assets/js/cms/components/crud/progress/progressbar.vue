<template>
<div class="col-lg-12 space-inside-up-lg  reset-padding">
    <div class="bg-secondary  reset-padding space-outside-down-sm">
        <div class="bg-main space-inside-sides-md space-inside-sm  border-curved width-over-time text-color-light"  :style="{width: currentWidth + '%'}" >{{ roundPercentage(currentWidth) }}%</div>
    </div>
    <p class="float-right text-bold"> {{ completedInputs }} / {{ totalInputs }} velden correct ingevuld. </p>
</div>  
</template>


<script type="text/javascript">
    export default {
        props: {
            totalInputs: 0,
            identifier: null,
        },
        data() {
            return {
                completedInputs: 0,
                currentWidth: '1',
                completed: {},
            }
        },
        mounted() {
            this.registerListeners();
        },


        methods: {
            registerListeners() {

                // reset the progressbar when this event is fired
                Event.listen('progressbar:reset:' + this.identifier, () => {
                    this.resetProgressbar();
                    this.updateProgressbar();
                });

                // increment the progressbar when this event is fired
                Event.listen('progressbar:increment:' + this.identifier, (identifier) => {
                   
                    this.completed[identifier] = true;
                    this.updateProgressbar();
                });

                // decrement the progressbar when this event is fired
                Event.listen('progressbar:decrement:' + this.identifier, (identifier) => {
                    this.completed[identifier] = false;
                    this.updateProgressbar();
                });

                // when this event is fired check if the progressbar is @ 100%
                // if this is not the case, notify the user 
                // if this is the case, fire an event that tells the application
                // that the progressbar is @ 100%
                Event.listen('progressbar:isCompleted:' + this.identifier, () => {

                    if(this.totalInputs != this.completedInputs) {
                        Notifier.info('U heeft nog niet alle velden correct ingevuld.');   
                        Event.fire('progressbar:incomplete:' + this.identifier );
                        Event.remove('progressbar:complete:' + this.identifier);                 
                    } else {
                        Event.fire('progressbar:complete:' + this.identifier);
                        Event.remove('progressbar:complete:' + this.identifier);
                    }

                });


            },

            updateProgressbar() {
                // we reset the completed inputs
                this.completedInputs = 0;


                // we recount all the fields that are filled in 
                for(let attribute in this.completed) {
                    if(this.completed[attribute]) {
                        this.completedInputs++;
                    }
                }
                // we calculate the percentage
                this.currentWidth = ((100 / this.totalInputs) * this.completedInputs) + '';
                // if the percentage is @ 0% we change it to 1%
                if(this.currentWidth === '0') {
                    this.currentWidth = '1';
                }
            },


            resetProgressbar() {
                this.completed = {};
                this.completedInputs = 0;  
            },

            roundPercentage(percentage) {
                return Helper.roundPercentage(percentage) 
            }
        }
    }

</script>