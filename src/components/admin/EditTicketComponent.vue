<template>
    <div class="content">
        <b-col>
            <div class="form-control">
                <label for="Title">Title</label>
                <b-form-input placeholder=""></b-form-input>
            </div>
        </b-col>
        {{ ticket }}
    </div>
</template>

<script>
export default {
    computed: {
        ticket() {
            return this.$store.getters.getTicketSelected;
        }
    },
}
</script>

<style scoped>
.content {
    position: relative;
    left: 300px;
    top: 50px;
    width: calc(100% - 300px);
    padding: 20px;
    min-height: calc(100vh - 50px);
    background-color: rgb(65, 65, 65);
    overflow: hidden;
    color: var(--foreground-color);
    text-align: left;
}
</style>