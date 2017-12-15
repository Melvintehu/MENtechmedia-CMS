<template>
    <div>
        <select v-model="sorter.selectedSortType" @change="sorter.sort()">
            <option v-for="option in sorter.options"></option>
        </select>
    </div>
</template>

<script>
    import Sortable from '../../../app/Sortable/Sortable';

    export default {
        props: {
            object: null,
        },

        data() {
            return {
                sorter: new Sortable(),
            }
        }, 

        mounted() {
            this.sorter.findSortableOptions(this.object);
        },
    }    
</script>