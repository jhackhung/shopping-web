<template>
    <div class="signup-container">
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <h1>註冊</h1>
        <form @submit.prevent="signUp">
            <div class="form-group" :class="{ invalid: !username.isValid }" @blur="clearValidity(username)"
                @input="clearInvalid('username')">
                <input type="text" id="username" placeholder="使用者名稱" v-model="username.val">
                <p v-if="!username.isValid">請輸入有效的使用者名稱</p>
            </div>
            <div class="form-group" :class="{ invalid: !email.isValid }" @blur="clearValidity(email)"
                @input="clearInvalid('email')">
                <input type="email" id="email" placeholder="電子郵件" v-model="email.val">
                <p v-if="!email.isValid">請輸入有效的電子郵件名稱</p>
            </div>
            <div class="form-group" :class="{ invalid: !password.isValid }" @blur="clearValidity(password)"
                @input="clearInvalid('password')">
                <input type="password" id="password" placeholder="密碼" v-model="password.val">
                <p v-if="!password.isValid">請輸入有效的密碼</p>
            </div>
            <button type="submit" class="signup-submit">註冊</button>
        </form>
        <div v-if="message">
            <base-dialog :show="true" :title="title" @close="handleMessage">
                {{ message }}
            </base-dialog>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            username: {
                val: '',
                isValid: true
            },
            email: {
                val: '',
                isValid: true
            },
            password: {
                val: '',
                isValid: true
            },
            formIsValid: true,
            isLoading: false,
            title: '',
            message: ''
        };
    },
    methods: {
        handleMessage() {
            this.title = '';
            this.message = '';
        },
        clearValidity(field) {
            field.isValid = !!field.val.trim();
        },
        clearInvalid(field) {
            this[field].isValid = true;
        },
        validateEmail(email) {
            // Regular expression to validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        validateForm() {
            this.formIsValid = true;
            if (this.username.val === '') {
                this.username.isValid = false;
                this.formIsValid = false;
            }
            if (this.email.val === '' || !this.validateEmail(this.email.val)) {
                this.email.isValid = false;
                this.formIsValid = false;
            }
            if (this.password.val === '') {
                this.password.isValid = false;
                this.formIsValid = false;
            }
        },
        async signUp() {
            try {
                this.isLoading = true;
                this.validateForm();

                if (!this.formIsValid) {
                    this.isLoading = false;
                    return;
                }
                const signUpData = {
                    username: this.username.val,
                    email: this.email.val,
                    password: this.password.val
                };
                await this.$store.dispatch('auth/signup', signUpData);
                this.$router.push({ path: '/login', query: { signup: true }});
                this.isLoading = false;
            } catch(error) {
                if(error.message === 'Username is already taken!') {
                    this.title = '註冊錯誤';
                    this.message = '使用者已存在';
                } else if (error.message === 'Email is already in use!') {
                    this.title = '註冊錯誤';
                    this.message = '電子郵件已存在';
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
.signup-container {
    max-width: 600px;
    margin: 3rem auto;
    padding: 40px 135px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

h1 {
    font-size: 2rem;
    text-align: center;
}

.form-group {
    margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    margin-bottom: 0.5rem;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f6f6f6;
}

input[type="text"]:focus,
input[type="email"]:focus,
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

.signup-submit {
    margin-bottom: 40px
}

.invalid input {
    border: 1px solid red;
}

.invalid p {
    font-size: 14px;
    text-align: center;
    color: red;
    margin: 0;
}
</style>