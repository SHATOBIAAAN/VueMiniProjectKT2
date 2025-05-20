<template>
    <footer class="footer">
        <ul class="socials-menu">
            <li>
                <i class="fab fa-facebook-square"></i>
            </li>
            <li>
                <i class="fab fa-instagram"></i>
            </li>
            <li>
                <i class="fab fa-twitter"></i>
            </li>
            <li>
                <i class="fab fa-linkedin"></i>
            </li>
        </ul>
        <p class="copyright">Copyright ©2020 All rights reserved</p>
    </footer>
</template>

<script>
export default {}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
.footer {
    font-family: 'Heebo', sans-serif;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 100px;
}
.socials-menu {
    display: flex;
    gap: 35px;
    list-style: none;
    padding: 0;
}
.socials-menu li {
    font-size: 35px;
    color: #23253a;
}
.copyright {
    font-size: 14px;
    color: #23253a;
    margin: 0;
}
</style>
