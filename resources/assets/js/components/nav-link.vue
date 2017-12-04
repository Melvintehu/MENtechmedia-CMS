<template>
<div class="left">
	<a @mouseover="open()" @mouseout="close()" class="inline-block text-hover-light  nav-menu-link bg-tertiary" href="#">
		{{ identifier }}
	</a>
</div>	
</template>

<style lang="scss">
	

	.nav-menu-link {

		font-weight: 600;
		position: relative;
		padding: 20px;
		color: white;
		
		&:hover {
			font-weight: 600;	
		}

		&:active {
			color: white;
		}


	}

</style>

<script type="text/javascript">
	export default {
		props: {
			identifier: null,
		},
		methods: {
			open() {
				console.log(this.identifier);
				Event.fire('nav:open:' + this.identifier.toLowerCase());
			}, 

			close() {
				Event.fire('nav:close:' + this.identifier.toLowerCase());
			}
		},

		mounted() {
			$('.nav-menu-dropdown').css('width', $(window).width());
		}
	}
</script>