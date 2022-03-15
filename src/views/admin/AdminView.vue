<template>
    <div>
        <div class="loading-screen" v-if="loading">
            <b-overlay :show="loading" rounded="sm" />
        </div>
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
    data() {
        return {
            loading: false,
        };
    },
    components: {
        SidebarComponent,
        TopbarComponent,
        TableComponent,
        EditTicketComponent,
    },
    async created() {
        this.loading = true;
        await this.$store.dispatch("fetchAllTickets");
        for (let item in this.tickets) {
            this.$store.dispatch("changeStatus", item);
            break;
        }
        this.loading =  false;
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
.loading-screen {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>