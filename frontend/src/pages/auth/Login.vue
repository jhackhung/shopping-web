<template>
    <section>
        <!-- <transition name="fade">    
            <div v-if="showLogoutMessage" class="logout-message">登出成功</div>
        </transition> -->
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <div class="login-container" v-else>
            <h1>登入</h1>
            <form @submit.prevent="login">
                <div class="form-group">
                    <!-- <label for="email">電子郵件</label> -->
                    <input type="text" id="user" placeholder="使用者名稱" v-model="user" required>
                </div>
                <div class="form-group">
                    <!-- <label for="password">密碼</label> -->
                    <input type="password" id="password" placeholder="密碼" v-model="password" required>
                </div>
                <button type="submit" class="login-submit">登入</button>
            </form>
        </div>
        <div v-if="message">
            <base-dialog :show="true" :title="title" @close="handleMessage">
                {{ message }}
            </base-dialog>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            user: '',
            password: '',
            title: '',
            message: '',
            isLoading: false,
            showLogoutMessage: false
        };
    },
    created() {
        if (this.$route.query.redirectToProductList) {
            this.title = '驗證錯誤'
            this.message = '您必須先登入才能加入購物車';
        } else if (this.$route.query.logout) {
            // this.showLogoutMessage = true;
            // setTimeout(() => {
            //     this.showLogoutMessage = false;
            // }, 3000);
            this.title = '登出成功';
            this.message = '您已成功登出';
        } else if (this.$route.query.signup) {
            this.title = '註冊成功';
            this.message = '您已成功註冊';
        } else {
            this.title = '';
            this.message = '';
        }
        
    },
    methods: {
        // Plan on your own for logging in and signing up.(logic)
        // Also contain the error handling, and connection to other page.
        handleMessage() {
            this.title = '';
            this.message = '';
            this.$router.replace({ query: {} });
        },
        async login() {
            this.isLoading = true;

            const loginData = {
                username: this.user,
                password: this.password
            };
            try {
                await this.$store.dispatch('auth/login', loginData);
                this.isLoading = false;
                if (this.$router) {
                    this.$router.push('/');
                } else {
                    console.error("$router is undefined");
                }

            } catch (error) {
                if (error.message === 'User Not Found!' || error.message === 'Invalid Password!') {
                    this.title = '登入錯誤';
                    this.message = '使用者名稱或密碼錯誤';
                } else {
                    this.title = '錯誤';
                    this.message = error.message;
                }
                this.isLoading = false;
            }

        }
    }
};
</script>

<style scoped>
.login-container {
    /* position: relative; */
    max-width: 600px;
    margin: 3rem auto;
    padding: 40px 135px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    z-index: 100;
}

h1 {
    font-size: 2rem;
    text-align: center;
}

.form-group {
    margin-bottom: 10px;
}

/* label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
} */

input[type="text"],
input[type="password"] {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f6f6f6;
}

input[type="text"]:focus,
input[type="password"]:focus {
    outline: none;
    background-color: #fff;
    border: 2px solid #000;
}

button {
    margin-top: 1.5rem;
    width: 100%;
    padding: 10px;
    background-color: rgb(60, 60, 67);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #000;
}

.login-submit {
    margin-bottom: 40px;
}

.alert {
    margin-top: 20px;
    padding: 10px;
    background-color: #f44336;
    color: white;
    text-align: center;
    border-radius: 4px;
}

.alert-danger {
    display: none;
}

/* .logout-message { error
  position: fixed;
  width: 30%;
  max-width: 400px;
  background-color: #f8f8f8;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
  z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>
