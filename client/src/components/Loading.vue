<template>
  <transition name="fade">
  	<div class="loading">
  	  <div class="loading__shadow">
  	  	<div class="loading__circle"></div>
  	  </div>
  	  <div v-if="message" class="loading__message">{{message}}</div>
  	</div>
  </transition>
</template>

<script>
	export default {
		name: 'Loading',
		props: {
			message: {
				type: String,
				default: ""
			}
		},
		data() {
			return {}
		},
		computed: {
			...mapState({
				isLoading: state => state.gameInfo.isLoading
			})
		}
	}
</script>
<style scoped lang="scss">
.loading {
  z-index: 999;
  background: url(../assets/img/loading.jpg) no-repeat center center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__shadow {
  	position: relative;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	background: rgba(0,0,0,.5);
  	display: flex;
  	align-items: center;
  	justify-content: center;
  }
  &__circle {
  	border: 16px solid #f3f3f3; /* Light grey */
	border-top: 16px solid #3498db; /* Blue */
	border-radius: 50%;
	width: 90px;
	height: 90px;
	animation: spin 1s linear infinite;
  }
  &__message {
  	position: absolute;
  	width: 100%;
  	bottom: 140px;
  	left: 0;
  	color: #fff;
  	font-size: 36px;
  	font-weight: bold;
  	text-align: center;
  }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
} 
</style>
