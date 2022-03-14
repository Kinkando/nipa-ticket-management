<template>
    <div class="topbar">
        <h3 class="title">Help Desk Support Ticket Management</h3>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.topbar {
    display: flex;
    align-items: center;
    justify-content: center;
    background: blue;
    z-index: 2;
    position: fixed;
    width: 100%;
    height: 50px;
    color: var(--foreground-color);
    background-color: var(--background-color);
}
h3.title {
    margin: auto;
}
</style>