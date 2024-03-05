<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="../../assets/cozyFit.png" alt="CozyFit Logo" />
                </div>
                <div class="footer-links">
                    <ul>
                        <li><a href="/products">Home</a></li>
                        <li><a href="/">Shop</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-social">
                    <ul>
                        <li><a href="https://www.facebook.com"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="https://www.x.com"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2022 CozyFit. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #f8f8f8;
    padding: 20px 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-logo img {
    width: 100px;
    height: auto;
}

.footer-links ul {
    list-style: none;
    display: flex;
    gap: 20px;
}

.footer-links a {
    color: #333;
    text-decoration: none;
}

.footer-social ul {
    list-style: none;
    display: flex;
    gap: 10px;
}

.footer-social i {
    color: #333;
    font-size: 18px;
}

.footer-bottom {
    text-align: center;
    color: #777;
}

/* Add styles for the body to make the footer stick to the bottom */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

</style>
