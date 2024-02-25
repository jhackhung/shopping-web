<template>
    <div class="login-container">
        <h1>登入</h1>
        <form @submit.prevent="login">
            <div class="form-group">
                <!-- <label for="email">電子郵件</label> -->
                <input type="email" id="email" placeholder="電子郵件" v-model="email" required>
            </div>
            <div class="form-group">
                <!-- <label for="password">密碼</label> -->
                <input type="password" id="password" placeholder="密碼" v-model="password" required>
            </div>
            <button type="submit" class="login-submit">登入</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            // Perform login logic here
            console.log('Logging in...');
        }
    }
};
</script>

<style scoped>
.login-container {
    max-width: 600px;
    margin: 3rem auto;
    padding: 40px 135px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

h1 {
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

input[type="email"],
input[type="password"] {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f6f6f6;
}

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

.login-submit {
    margin-bottom: 40px;
}
</style>
