<template>
  <div id="app">
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
</style>
