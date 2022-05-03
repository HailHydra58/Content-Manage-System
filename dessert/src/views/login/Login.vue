<template>
	<div id="loginBox">
		<img src="@/assets/logo.png" alt="" srcset="" />
		<h1>甜品管理系统</h1>
		<input v-model="id" type="text" />
		<input v-model="pwd" type="password" @keyup.enter="signIn" />
		<el-button id="signIn" type="primary" round @click="signIn">登录</el-button>
	</div>
</template>

<script>
	import {
		getLogin
	} from '@/network/request.js'

	export default {
		data() {
			return {
				id: "",
				pwd: ""
			};
		},
		methods: {
			signIn() {
				getLogin(this.id, this.pwd).then((res) => {
					console.log(res)
					if (res.data.code == 200) {
						this.$router.push("/shopowner");
						console.log("登陆成功", `权利为${res.data.data[0].root}`)
					}
				})

				// for (let i = 0; i < this.staff.length; i++) {
				//   const item = this.staff[i];
				//   if (this.tel == item.tel && this.pwd == item.pwd) {
				//     this.$store.state.isLogin = true;
				//     switch (item.root) {
				//       case 1:
				//         this.$router.push("/shopowner");
				//         break;
				//       case 2:
				//         this.$router.push("/purchase");
				//         break;
				//       case 3:
				//         this.$router.push("/sale");
				//         break;
				//     }
				//   }
				// }
			},
		}
	};
</script>

<style scoped>
	#signIn {
		width: 300px;
		height: 60px;
		font-size: 25px;
		position: relative;
		top: 40px;
		left: 100px;
	}

	#loginBox {
		width: 500px;
		height: 400px;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		margin-top: 90px;
	}

	input {
		height: 50px;
		margin-top: 20px;
		border-radius: 20px;
		font-size: 21px;
		padding: 0 20px;
	}

	img {
		width: 150px;
		height: 150px;
		margin: 0 auto;
	}

	h1 {
		text-align: center;
	}
</style>
