<template>
<div>
	<div class="container">
		<div class="row">
			<!-- navigation links  -->
			<nav-link identifier="Home"></nav-link>
			<nav-link identifier="Instruments"> </nav-link>
			<nav-link identifier="Road maps"> </nav-link>
			<nav-link identifier="Theory"> </nav-link>


		</div>
	</div>
			<!-- dropdown menu's -->
			<nav-dropdown for="home"> 
				<div class="bg-tertiary full-height space-inside-lg space-inside-sides-lg">
					<div class="col-lg-1">
						<nav-link-image href="#test" src="/images/guitar.jpg"> Dashboard </nav-link-image>
					</div>

					<div class="col-lg-1">
						<nav-link-image href="#test2" src="/images/guitar.jpg"> Challenges </nav-link-image>
					</div>

					<div class="col-lg-1">
						<nav-link-image href="#test3" src="/images/guitar.jpg"> Exercises </nav-link-image>
					</div>
				</div>
			</nav-dropdown>

			<nav-dropdown for="instruments"> 
				<div class="bg-tertiary full-height space-inside-lg space-inside-sides-lg">
					<a class="link" href="#">Guitar</a>
					<a class="link" href="#">Piano</a>
					<a class="link" href="#">Drums</a>
					<a class="link" href="#">Bass guitar</a>
				</div>
			</nav-dropdown>

			<nav-dropdown for="road maps"> 
				<div class="bg-tertiary full-height space-inside-lg space-inside-sides-lg">
					<a class="link" href="#">Campfire songs</a>
					<a class="link" href="#">Jazz musician</a>
					<a class="link" href="#">Rock musician</a>
					<a class="link" href="#">Allround musician</a>
				</div>
			</nav-dropdown>

			<nav-dropdown for="theory"> 
				<div class="bg-tertiary full-height space-inside-lg space-inside-sides-lg">
					<a class="link" href="#">Beginner</a>
					<a class="link" href="#">Novice</a>
					<a class="link" href="#">Advanced</a>
					<a class="link" href="#">Expert</a>
					<a class="link" href="#">Professional</a>
				</div>
			</nav-dropdown>

</div>
</template>

<style lang="scss">
	.link {
		display: block;
		color: white;
		margin: 5px 0;

		span {
			margin-bottom: 10px;
		}

		div {
			overflow: hidden;
			width: 60px;
			height: 60px;

			img {
				width: auto;
				height: 100%;
			}
		}
	}



</style>

<script type="text/javascript">
	export default {

	}
</script>