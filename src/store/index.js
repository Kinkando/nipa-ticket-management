import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tickets: {},
        ticketStatus: "",
        ticketSelected: "",
    },
    getters: {
        getTickets(state) {
            return state.tickets;
        },
        getTicketStatus(state) {
            return state.ticketStatus;
        },
        getTicketSelected(state) {
            return state.ticketSelected;
        },
    },
    mutations: {
        setTickets(state, tickets) {
            state.tickets = tickets;
        },
        setTicketStatus(state, status) {
            state.ticketStatus = status;
        },
        setTicketSelected(state, ticket) {
            state.ticketSelected = ticket;
        },
    },
    actions: {
        async fetchAllTickets({ commit }) {
            const tickets = await axios.get(
                `https://nipa-ticket-api.herokuapp.com/ticket/all?status_sort=asc&update_sort=desc`
            );
            if (!tickets.data.status) return
            let statusTickets = {};
            for (let item of tickets.data.tickets) {
                if (!statusTickets[item.status]) {
                    statusTickets[item.status] = [];
                }
                statusTickets[item.status].push(item);
            }
            commit("setTickets", statusTickets);
        },
        async fetchTicket({ commit }, id) {
            const ticket = await axios.get(
                `https://nipa-ticket-api.herokuapp.com/ticket/get/${id}`
            );
            if (!ticket.data.status) return
            commit("setTicketSelected", ticket.data.ticket);
        },
        changeSelected({ commit }, ticket) {
            commit("setTicketSelected", ticket);
        },
        changeStatus({ commit }, status) {
            commit("setTicketStatus", status);
        }
    },
    modules: {}
})