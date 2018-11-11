<template>
	<div class="alert"
	:class="type"
	>
		<h2>{{text}}</h2>
		<hr>
		<button class="btn btn-primary"
		@click="$emit('onNext')"
		>
			Продолжить
		</button>
	</div>
</template>

<script>
	export default{
		props:["type","text"]

	}
</script>


<style>
	
</style>