<template>
  <div id="app">
    <header>
      <img src="../src/assets/github-logo.png" alt="logo" />
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
* {
  font-family: Montserrat, Helvetica Neue, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: Montserrat, Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: 1px;
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  header {
    max-width: 1280px;
    width: 100%;
    height: 50px;
    background-color: #24292e;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      color: white;
      width: 150px;
    }
  }
  @media screen and(max-width:768px ) {
    header {
      height: 80px;
      img {
        color: white;
        width: 200px;
      }
    }
  }
}
</style>
