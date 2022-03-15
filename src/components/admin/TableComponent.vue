<template>
    <div class="content">
        <div class="loading" v-if="loading">
            <div class="loader"></div>
        </div>
        <div>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
        };
    },
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
        async selectTicket(ticket) {
            this.loading = true;
            await this.$store.dispatch("fetchTicket", ticket.id);
            this.loading = false;
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

.loading {
    position: fixed;
    left: 300px;
    top: 50px;
    height: calc(100vh - 50px);
    width: calc(100vw - 300px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
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