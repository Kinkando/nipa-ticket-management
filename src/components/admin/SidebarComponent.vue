<template>
    <div class="sidebar">
        <div class="nav-header">
            <span class="nav-tag-name">Tickets</span>
            <i class='bx bx-refresh nav-tag-right refresh' @click="reloadTicket()"></i>
        </div>
        <hr>
        <div v-if="loading" class="loading">
            <div class="loader"></div>
        </div>
        <span v-else>
            <div 
            v-for="(item, key) in tickets" 
            :key="key" 
            :class="[key === statusSelected ? 'nav-item active': 'nav-item']" 
            @click="changeStatusTicket(key)"
            >
                <span class="nav-tag-name">{{ key }} tickets</span>
                <span class="nav-tag-right">{{ item.length }}</span>
            </div>
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        async reloadTicket() {
            this.loading = true;
            this.$store.dispatch("changeSelected", "");
            await this.$store.dispatch("fetchAllTickets");
            for (let item in this.tickets) {
                this.$store.dispatch("changeStatus", item);
                break;
            }
            this.loading = false;
        },
        changeStatusTicket(status) {
            this.$store.dispatch("changeSelected", "");
            this.$store.dispatch("changeStatus", status);
        },
    },
    computed: {
        statusSelected() {
            return this.$store.getters.getTicketStatus;
        },
        tickets() {
            return this.$store.getters.getTickets;
        },
    }
}
</script>

<style scoped>
.sidebar {
    position: fixed;
    left: 0;
    top: 50px;
    width: 300px;
    height: calc(100% - 50px);
    background-color: var(--primary-color);
    overflow-y: auto;
    padding: 20px;
}

.sidebar::-webkit-scrollbar {
    /* hidden scrollbar */
    display: none;
}

.nav-header {
    display: flex;
    align-items: center;
    color: var(--secondary-color);
    padding: 10px 20px;
    font-size: 20px;
}

.sidebar hr {
    width: 100%;
    height: 1px;
    border: none;
    background-color: #777;
    margin-bottom: 5px;
}

.refresh {
    font-size: 25px;
    cursor: pointer;
}

.nav-item {
    display: flex;
    align-items: center;
    color: var(--foreground-color);
    padding: 10px 20px;
    cursor: pointer;
}

.nav-item:hover {
    background-color: var(--foreground-color);
    color: var(--background-color);
}

.nav-item.active {
    background-color: var(--foreground-color);
    color: var(--background-color);
}

.nav-tag-right {
    margin-left: auto;
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
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