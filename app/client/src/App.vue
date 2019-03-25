<template>
  <div>
    <!-- <h1 id="test">Hello <span>World</span></h1> -->
		<!-- <router-link to="/">Home</router-link>
		<router-link to="/test">About</router-link> -->
		<Header></Header>
		<router-view></router-view>
  </div>
</template>
<script>
const Header = () => import(/* webpackChunkName: "Header" */ 'components/Header.vue')

export default {
	data(){
		return {

		}
	},
	components: {
		Header
	}
}
</script>

<style scoped lang="scss">
#test {
	color: blue;
	span {
		color: gray;
	}
}
</style>