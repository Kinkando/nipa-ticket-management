<template>
    <div class="content">
        <h2>{{ ticketTag() }}</h2>
        <h4>{{ tickets[statusSelected].length }} ticket(s)</h4>
        <br>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Requester</th>
                    <th>Create timestamp</th>
                    <th>Latest update timestamp</th>
                    <th>Channel</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tickets[statusSelected]"  :key = item.id>
                    <th>{{ item.title }}</th>
                    <th>{{ item.contact_information.requester_name }}</th>
                    <th>{{ item.create_timestamp }}</th>
                    <th>{{ item.latest_update_timestamp }}</th>
                    <th>{{ item.channel }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    computed: {
        statusSelected() {
            return this.$store.getters.getTicketStatus;
        },
        tickets() {
            return this.$store.getters.getTickets;
        }
    },
    methods: {
        ticketTag() {
            return this.statusSelected.replace(this.statusSelected.charAt(0), this.statusSelected.charAt(0).toUpperCase()) + " Tickets";
        },
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
h2 {
    margin-left: 2rem;
}
h4 {
    margin-left: 2rem;
    color: rgb(200, 200, 200);
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
}

td,
th {
    border: 1px solid var(--foreground-color);
    padding: 10px;
}
</style>