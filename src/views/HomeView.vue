<template>
    <div class="main-content">
        <div class="left">
            <h1 class="title color-purple underline">Home page</h1>
            <div class="text-container">
                <p class="text color-purple">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                </p>
            </div>
            <RouterLink to="/login">
                <button class="button-red">Authorization</button>
            </RouterLink>
        </div>
        <div class="right">
            <img src="../photo/tools 1.png" alt="home" class="image" />
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap');

.main-content {
    margin-top: 140px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 120px;
}
.left {
    max-width: 490px;
}
.title {
    font-size: 44px;
    font-family: 'Heebo', sans-serif;
    font-weight: 700;
    color: #21243d;
    margin-bottom: 48px;
}

.text-container {
    margin-bottom: 49px;
}
.button-red {
    background: #ff6464;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 12px 32px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 24px;
}
.image {
    width: 320px;
    height: 320px;
    object-fit: contain;
}
</style>
