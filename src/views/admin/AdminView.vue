<template>
    <div>
        <div v-if="loading" class="loading">
            <div class="loader"></div>
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
.loading {
    position: fixed;
    background: red;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    background: none;
}

.loader {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>