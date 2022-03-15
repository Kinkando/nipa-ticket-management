<template>
    <div :class="!loading ? 'content' : 'content load'">
        <div class="loading" v-if="loading">
            <div class="loader"></div>
        </div>
        <b-form @submit.prevent="onSubmit">
            <div
                class="form-wrap"
                v-for="(item, key) in uTicket"
                :key="key"
            >
                <b-form-group
                    :label="label(key)"
                    :label-for="key"
                >
                    <b-form-textarea
                        style="max-height: 296px; min-height: 65px;"
                        class="input"
                        v-if="key==='description'"
                        oninput='this.style.height = "";this.style.height = (this.scrollHeight+5) + "px"'
                        :value="item"
                        :placeholder="item"
                        v-model="uTicket[key]"
                        required
                    />
                    <b-form-select
                        class = "dropdown"
                        v-else-if="['channel', 'status'].includes(key)"
                        v-model="uTicket[key]"
                        :options="key === 'status' ? statusOption : channelOption"
                    />
                    <b-form-input 
                        class="input"
                        v-else
                        :value="item"
                        :placeholder="item"
                        v-model="uTicket[key]"
                        :type="key === 'requester_email' ? 'email' : 'text'"
                        :maxlength="key === 'requester_tel' ? '10' : ''"
                        :minlength="key === 'requester_tel' ? '10' : ''"
                        required
                    />
                </b-form-group>
            </div>
            <b-row class="buttons">
                <b-button type="submit" class="buttons-control left" variant="success">Save</b-button>
                <b-button @click="onReset()" class="buttons-control" variant="danger">Reset</b-button>
            </b-row>
            <b-alert variant="danger" class="alert" :show="alert.length>0">Error: {{ alert }}</b-alert>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            uTicket: {
                title: this.$store.getters.getTicketSelected.title,
                description: this.$store.getters.getTicketSelected.description,
                requester_name: this.$store.getters.getTicketSelected.contact_information.requester_name,
                requester_tel: this.$store.getters.getTicketSelected.contact_information.requester_tel,
                requester_email: this.$store.getters.getTicketSelected.contact_information.requester_email,
                channel: this.$store.getters.getTicketSelected.contact_information.channel,
                status: this.$store.getters.getTicketSelected.status,
            },
            alert: "",
            channelOption: ["Facebook", 'Line', 'Web Form'],
            statusOption: ['pending', 'accepted', 'resolved', 'rejected'],
            loading: false,
        };
    },
    computed: {
        ticket() {
            return this.$store.getters.getTicketSelected;
        },
        tickets() {
            return this.$store.getters.getTickets;
        },
        ticketStatus() {
            return this.$store.getters.getTicketStatus;
        }
    },
    methods: {
        label(name) {
            if (name==="id") {
                return name.toUpperCase();
            }
            name = name.charAt(0).toUpperCase() + name.substring(1); // Capital letter in first word
            let index; // Capital letter in each new word
            while((index = name.indexOf("_")) != -1) {
                name = name.replace(`_${name.charAt(index+1)}`, ` ${name.charAt(index+1).toUpperCase()}`)
            }
            return name.replace(" Tel", " Telephone Number");
        },
        async onSubmit() {
            this.loading = true;
            const url = `https://nipa-ticket-api.herokuapp.com/ticket/update`;
            const jsonBody = JSON.stringify({
                id: this.ticket.id,
                description: this.uTicket.description,
                name: this.uTicket.requester_name,
                tel: this.uTicket.requester_tel,
                email: this.uTicket.requester_email,
                channel: this.uTicket.channel,
                status: this.uTicket.status,
            });
            const update = await axios({
                method: 'PUT',
                url,
                data: jsonBody,
                headers:{'Content-Type': 'application/json; charset=utf-8'}
            });

            // Update successful
            if(update.data.status) {
                this.$store.dispatch('changeSelected', '');
                await this.$store.dispatch("fetchAllTickets");
                if(this.tickets[this.ticketStatus] == undefined) {
                    for (let item in this.tickets) {
                        this.$store.dispatch("changeStatus", item);
                        break;
                    }
                }
            }
            else {
                this.alert = update.data.message;
            }
            this.loading = false;
        },
        onReset() {
            this.uTicket = {
                title: this.ticket.title,
                description: this.ticket.description,
                requester_name: this.ticket.contact_information.requester_name,
                requester_tel: this.ticket.contact_information.requester_tel,
                requester_email: this.ticket.contact_information.requester_email,
                channel: this.ticket.contact_information.channel,
                status: this.ticket.status,
            };
        },
    }
}
</script>

<style scoped>
.content {
    position: relative;
    left: 300px;
    top: 50px;
    width: calc(100% - 300px);
    padding: 20px;
    background-color: rgb(65, 65, 65);
    overflow: hidden;
    color: var(--foreground-color);
    text-align: left;
}

.load {
    background-color: rgba(65, 65, 65, 0.8);
}

.form-wrap {
    width: 80%;
    margin: 20px auto;
}

.input {
    font-weight: bolder;
}

.buttons, .alert {
    width: 80%;
    margin: 40px auto;
    text-align: center;
}

.buttons-control {
    width: 48%;
}

.left {
    margin-right: 4%;
}

.dropdown {
    font-weight: bolder;
}

.loading {
    position: fixed;
    background: red;
    left: 300px;
    top: 50px;
    width: calc(100vw - 300px);
    height: calc(100vh - 50px);
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