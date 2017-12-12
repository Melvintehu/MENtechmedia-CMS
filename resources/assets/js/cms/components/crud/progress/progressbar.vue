<template>
<div class="col-lg-12 space-inside-up-lg  reset-padding">
    <div class="bg-secondary  reset-padding space-outside-down-sm">
        <div class="bg-main space-inside-sides-md space-inside-sm  border-curved width-over-time text-color-light"  :style="{width: progressBar.currentWidth + '%'}" >{{ progressBar.roundPercentage(progressBar.currentWidth) }}%</div>
    </div>
    
    <p class="float-right text-bold"> {{ progressBar.completedInputs }} / {{ progressBar.totalInputs }} velden correct ingevuld. </p>
</div>  
</template>


<script type="text/javascript">
    export default {
        props: {
            progressBar: null,
        },     
    }

</script>