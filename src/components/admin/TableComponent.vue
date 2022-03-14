<template>
    <div class="content">
        <h2>{{ ticketTag }}</h2>
        <h4>{{ ticketNumber }} ticket(s)</h4>
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
                <tr v-if="ticketNumber==0" >
                    <th colspan="5" style="text-align: center;">Empty ticket</th>
                </tr>
                <tr v-else 
                v-for="item in tickets[statusSelected]"  
                :key = item.id
                @click="selectTicket(item)"
                >
                    <th>{{ item.title }}</th>
                    <th>{{ item.contact_information.requester_name }}</th>
                    <th>{{ item.create_timestamp }}</th>
                    <th>{{ item.latest_update_timestamp }}</th>
                    <th>{{ item.contact_information.channel }}</th>
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
        },
        ticketNumber() {
            return this.tickets[this.statusSelected] ? this.tickets[this.statusSelected].length : 0;
        },
        ticketTag() {
            return this.statusSelected.charAt(0).toUpperCase()+this.statusSelected.substring(1) + " Tickets";
        },
    },
    methods: {
        selectTicket(ticket) {
            this.$store.dispatch("fetchTicket", ticket.id);
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
    border-bottom: 1px solid var(--foreground-color);
    padding: 10px;
}

tbody tr:hover {
    background-color: var(--primary-color);
    cursor: pointer;
}
</style>