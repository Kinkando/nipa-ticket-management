<template>
    <div>
        <div class="background" />
        <TopbarComponent />
        <SidebarComponent />
        <TableComponent v-if="!isTicketSelected" />
        <EditTicketComponent v-else />
    </div>
</template>

<script>
import SidebarComponent from "@/components/admin/SidebarComponent.vue";
import TopbarComponent from "@/components/admin/TopbarComponent.vue";
import TableComponent from "@/components/admin/TableComponent.vue";
import EditTicketComponent from "@/components/admin/EditTicketComponent.vue";
export default {
    components: {
        SidebarComponent,
        TopbarComponent,
        TableComponent,
        EditTicketComponent,
    },
    async created() {
        await this.$store.dispatch("fetchAllTickets");
        for (let item in this.tickets) {
            this.$store.dispatch("changeStatus", item);
            break;
        }
    },
    computed: {
        statusSelected() {
            return this.$store.getters.getTicketStatus;
        },
        tickets() {
            return this.$store.getters.getTickets;
        },
        isTicketSelected() {
            return this.$store.getters.getTicketSelected.length != 0;
        },
    },
}
</script>

<style scoped>
.background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(65, 65, 65);
}
</style>