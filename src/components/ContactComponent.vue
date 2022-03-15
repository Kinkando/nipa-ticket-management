<template>
    <div>
        <b-card class="m-4 px-2">
            <b-form @submit.prevent="onSubmit">
                <div
                    v-for="(item, key) in contact"
                    :key="key"
                >
                    <b-form-group
                        v-if="key !== 'name'"
                        :label="label(key)"
                        :label-for="key"
                    >
                        <b-form-textarea
                            v-if="key=='description'"
                            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                            v-model="contact[key]"
                            required
                        />
                        <b-form-input
                            v-else
                            v-model="contact[key]"
                            required
                            :type="key == 'title' ? 'text' : key"
                        />
                    </b-form-group>
                    <b-row
                        v-else
                        class="px-3"
                    >
                        <b-form-group
                            class="form-partial"
                            v-for="(sub_name, sub_key) in item"
                            :key="sub_key"
                            :label="label(sub_key)"
                            :label-for="sub_key"
                        >
                            <b-form-input
                                v-model="contact[key][sub_key]"
                                required
                            />
                        </b-form-group>
                    </b-row>
                </div>
                <b-button type="submit" class="mt-2" variant="outline-primary">Submit</b-button>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            contact: {
                title: "",
                description: "",
                name: {
                    first_name: "",
                    last_name: "",
                },
                tel: "",
                email: "",
            },
        };
    },
    methods: {
        label(name) {
            name = name.charAt(0).toUpperCase() + name.substring(1); // Capital letter in first word
            let index; // Capital letter in each new word
            while((index = name.indexOf("_")) != -1) {
                name = name.replace(`_${name.charAt(index+1)}`, ` ${name.charAt(index+1).toUpperCase()}`)
            }
            return name.replace("tel", "Telephone Number");
        },
        async onSubmit() {
            const url = `https://nipa-ticket-api.herokuapp.com/ticket/create`;
            const jsonBody = JSON.stringify({
                title: this.contact.title,
                description: this.contact.description,
                name: this.contact.name.first_name.trim()+" "+this.contact.name.last_name.trim(),
                tel: this.contact.tel,
                email: this.contact.email,
                channel: 'Web Form',
            });
            const result = await axios({
                method: 'POST',
                url, 
                data: jsonBody, 
                headers:{'Content-Type': 'application/json; charset=utf-8'}
            });
            console.log(jsonBody);
            console.log(url)
            console.log(result.data);
        },
    },
}
</script>

<style scoped>
.form-partial {
    width: 48%;
}

.form-partial:first-child {
    margin-right: 4%;
}
</style>