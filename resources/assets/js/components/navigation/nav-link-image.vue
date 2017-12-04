<template>
	<a class="link" :href="href">
		<span class="block" >
			<slot></slot>
		</span>
		<div class="image" >
			<img  :src="src">
		</div>
	</a>
</template>
<script type="text/javascript">
	export default {
		props: {
			src: null,
			href: null,
		}
	}
</script>