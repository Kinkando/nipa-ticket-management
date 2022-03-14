<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->

    <router-view/>
  </div>
</template>

<style>
:root {
    --background-color: rgb(34, 31, 31);
    --foreground-color: #fff;
    --primary-color: #333;
    --secondary-color: rgb(54, 188, 155);
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-weight: bold;
  font-family: 'Prompt', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* 
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} 
*/
</style>
