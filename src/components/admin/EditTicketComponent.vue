<template>
    <div class="content">
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
                        class="input"
                        v-if="key==='description'"
                        oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                        :value="item"
                        :placeholder="item"
                        v-model="uTicket[key]"
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
                    />
                </b-form-group>
            </div>
            <b-row class="buttons">
                <b-button type="submit" class="buttons-control left" variant="success">Save</b-button>
                <b-button @click="onReset()" class="buttons-control" variant="danger">Reset</b-button>
            </b-row>
        </b-form>
        <b-alert variant="danger" class="alert" :show="alert.length>0">Error: {{ alert }}</b-alert>
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
            const url = `https://nipa-ticket-api.herokuapp.com/ticket/update?id=${this.ticket.id}&description=${this.uTicket.description}&name=${this.uTicket.requester_name}&tel=${this.uTicket.requester_tel}&email=${this.uTicket.requester_email}&channel=${this.uTicket.channel}&status=${this.uTicket.status}`;
            const update = await axios.put(url);
            console.log(update.data.status)

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
    min-height: calc(100vh - 50px);
    background-color: rgb(65, 65, 65);
    overflow: hidden;
    color: var(--foreground-color);
    text-align: left;
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
</style>