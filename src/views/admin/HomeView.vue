<template>
    <div>
        <TopbarComponent />
        <SidebarComponent />
        <SelectTicketComponent />
    </div>
</template>

<script>
import SidebarComponent from "@/components/admin/SidebarComponent.vue";
import TopbarComponent from "@/components/admin/TopbarComponent.vue";
import SelectTicketComponent from "@/components/admin/SelectTicketComponent.vue";
export default {
    components: {
        SidebarComponent,
        TopbarComponent,
        SelectTicketComponent,
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
        }
    },
}
</script>

<style lang="scss" scoped>

</style>