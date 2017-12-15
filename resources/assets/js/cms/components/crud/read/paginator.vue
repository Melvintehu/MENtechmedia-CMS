<template>
   <div>
        <div class="full-width">
            <div class="inline-block left">
                <ul class="pagination">
                    <li class="page-item" @click="previousPage()"><a class="text-color-dark" href="#">Vorige</a></li>
                    <li class="page-item" @click="changePageNumber(n)" v-for="n in maximumPages"><a class="text-color-dark" :class="{ 'text-color-main': n === currentPage }" href="#">{{ n }}</a></li>
                    <li class="page-item" @click="nextPage()"><a class="text-color-dark" href="#">Volgende</a></li>
                </ul>
            </div>
            <div class="inline-block right space-inside-up-sm">
                <span class="space-outside-sides-xs">Items per pagina:</span>
                <select v-model="numberPerPage" class="border-curved space-inside-sides-sm space-inside-xs" @change="changeItemsPerPage()">
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
            </div>
        </div>
   </div>
</template>

<script>
    import Paginator from '../../../app/Paginator/Paginator';

   export default {
       props: {
           referenceData: null,
       },

       data() {
           return {
               maximumPages: 0,
               currentPage: 1,
               numberPerPage: 5,
               paginator: new Paginator(),
           }
       },

       mounted() {
           this.setMaximumPages();
           this.paginate();
       },

       methods: {
           previousPage() {
               if((this.currentPage - 1) <= 0) {
                   toastr.error("Er is geen vorige pagina.");
               }else{
                   this.changePageNumber(this.currentPage - 1);
               }
           },

           nextPage() {
               if((this.currentPage + 1) > this.maximumPages) {
                   toastr.error("Er is geen volgende pagina.");
               }else{
                   this.changePageNumber(this.currentPage + 1);
               }
           },

           changePageNumber(pageNumber) {
               this.currentPage = pageNumber;
               this.paginate();
           },

           changeItemsPerPage() {
               this.setMaximumPages();
               if(this.currentPage > this.maximumPages){
                   this.currentPage = this.maximumPages;
               }
               this.paginate();
           },

          paginate() {
              this.paginator.paginate(this.numberPerPage, this.currentPage, this.referenceData)
          },

          setMaximumPages() {
              this.maximumPages = Math.ceil(this.referenceData.length / this.numberPerPage);
          }
       }
   }   
</script>

