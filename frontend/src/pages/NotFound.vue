<template>
    <div>
        <h2>404 - Not Found</h2>
        <p>The page you are looking for does not exist. Maybe you can go <router-link to="/products">our products page</router-link>.</p>
    </div>
</template>
  
<style scoped>
div {
    text-align: center;
    margin-top: 50px;
}

h2 {
    font-size: 2rem;
    color: #333;
}

p {
    font-size: 1.2rem;
    color: #666;
    margin-top: 20px;
}
</style>