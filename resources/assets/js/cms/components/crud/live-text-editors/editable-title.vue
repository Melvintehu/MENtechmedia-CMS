<template>
<div @dblclick="openOverlay()" :id="'title'+ this.id" class="">
    <slot></slot>
    <overlay  :identifier="id + 'title'">
        <input style="border-color: #f1f1f1;" class="border full-width space-inside-sides-md space-inside-md space-outside-down-xs" v-model="title"  />


        <button @click="update" style="background: #E65100;" class="text-color-light border-none space-inside-xs space-inside-sides-sm"> aanpassen </button>
    </overlay>
</div>

</template>

<script>
  

    export default {
        props: {
            id: null,
        },

        data() {
            return {
                section: null,
                titles: null,
                title: null,
            }
        },

        mounted() {
             console.log(window.Laravel);
            Factory.getStaticInstance('section').find(this.id).then((section) => {
                this.section = section;
                this.setUpReference();
                this.populateHtml(section.title);
                this.populateInput();
            });
        },

        methods: {
            openOverlay() {
                Event.fire('overlay:open' + this.id + 'title');
            },

            setUpReference() {
               this.titles = $('#title' + this.id).find('span.__text_content__');                
            },

            populateHtml(title) {
                let amountOfParts = this.titles.length;
                let titleInParts = title.split(" ");
                
                for(let i = 1; i <= amountOfParts; i++) {
                    if(i < amountOfParts ) {
                        
                        this.titles[i-1].innerHTML = titleInParts.shift();
                    } else {
                        this.titles[i-1].innerHTML = titleInParts.join(" ");
                    }
                  
                }
            },

            populateInput() {
                this.title = _.map(this.titles, (title) => {
                    return title.innerHTML;
                }).join(' ');

                
            },

            update() {
                this.populateHtml(this.title);

                this.section.title = this.title;
                this.section.update().then(() => {
                    Event.fire('overlay:close');
                });
            }
        }


    }
</script>