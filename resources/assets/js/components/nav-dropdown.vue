<template>
<div>
	<div style="clear:both;"></div>	
	<transition name="fade">
		<div @mouseover="open()" @mouseout="close()" v-if="!hidden" class="nav-menu-dropdown">
			<slot > </slot>
		</div>
	</transition>
</div>
</template>

<style lang="scss">
	
	.fade-enter-active, .fade-leave-active {
	  transition: opacity 1s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0
	}

	.nav-menu-dropdown {
		position: absolute;
		width: 100%;
		height: 400px;
		left: 0;
	}
</style>

<script type="text/javascript">
	export default {
		props: {
			for: null,
		},

		data() {
			return {
				hidden: true,
			}
		},

		mounted() {
			Event.listen('nav:open:' + this.for.toLowerCase(), () => {
				this.open();
			});

			Event.listen('nav:close:' + this.for.toLowerCase(), () => {
				this.close();
			});

		},

		methods: {
			open() {
				this.hidden = false;

				if(!this.hidden) {
					$(document).ready(() => {
						$('.nav-menu-dropdown').css('width', $(window).width());
					});
				}
			},

			close() {
				this.hidden = true;
			}
		}
	}
</script>