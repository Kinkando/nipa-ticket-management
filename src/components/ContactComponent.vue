<template>
    <div class="content">
        <div class="background"></div>
        <div class="cards">
            <b-overlay :show="loading" rounded="sm" class="p-4 card-wrap">
                <div class="cards-header">
                    <p>Contact Information</p>
                    <hr>
                </div>
                <b-form @submit.prevent="onSubmit">
                    <div
                        v-for="(item, key) in contact"
                        :key="key"
                    >
                        <div class="d-flex mb-2">
                            <span :class="key === 'description' ? 'form-description' : 'form-title m-auto'">
                                {{ label(key) }}
                            </span>
                            <b-input-group-prepend is-text  class="form-icon">
                                <b-icon :icon="details[key][0]"></b-icon>
                            </b-input-group-prepend>
                            <b-form-textarea
                                :class="contact[key].length > 0 ? 'form-input not-empty form-textarea' : 'form-input form-textarea'"
                                v-if="key=='description'"
                                v-model="contact[key]"
                                :placeholder="details[key][1]"
                                required
                            />
                            <b-form-input
                                :class="contact[key].length > 0 ? 'form-input not-empty' : 'form-input'"
                                :placeholder="details[key][1]"
                                v-else
                                v-model="contact[key]"
                                required
                                :type="['title', 'name'].includes(key) ? 'text' : key"
                                :maxlength="key === 'tel' ? '10' : ''"
                                :minlength="key === 'tel' ? '10' : ''"
                            />
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <b-button type="submit" class="mt-2" variant="success" v-b-modal.modal-1>Submit</b-button>
                    </div>
                </b-form>
            </b-overlay>
        </div>
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
                name: "",
                tel: "",
                email: "",
            },
            details: {
                title: ['tag-fill', 'Deploy API issue'],
                description: ["chat-square-text-fill", `Heroku server is reload file.json after not changing the value for a period of time`],
                name: ["person-fill", 'John Cena'],
                tel: ["telephone-fill", '0936578421'],
                email: ["envelope-fill", 'Hoya@hotmail.com'],
            },
            loading: false,
            modal: true,
        };
    },
    methods: {
        label(name) {
            name = name.charAt(0).toUpperCase() + name.substring(1); // Capital letter in first word
            let index;
            // Capital letter in each new word
            while((index = name.indexOf("_")) != -1) {
                name = name.replace(`_${name.charAt(index+1)}`, ` ${name.charAt(index+1).toUpperCase()}`)
            }
            return name.replace("Tel", "Telephone");
        },
        async onSubmit() {
            this.loading = true;
            const url = `https://nipa-ticket-api.herokuapp.com/ticket/create`;
            const jsonBody = JSON.stringify({
                title: this.contact.title,
                description: this.contact.description,
                name: this.contact.name,
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
            this.loading = false;

            // Reset form when contact success
            if(result.data.status) {
                //Iterate through each object field, key is name of the object field and reset to ''
                Object.keys(this.contact).forEach((key) => this.contact[key] = '');

                // Success dialog
                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your contact has been sent',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                // Failed dialog
                this.$swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Email or telephone number is invalid',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
    },
}
</script>

<style scoped>
.background {
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: url("../assets/background-image.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
}

.cards {
    padding: 50px;
}

.cards-header {
    text-align: center;
    font-weight: bold;
    font-size: 35px;
}

.card-wrap {
    overflow: hidden;
    max-width: 600px;
    border-radius: 20px;
    background-color: #eee;
    box-shadow: 4px 4px 10px 1px #333;
    margin: auto;
}

.form-title, .form-description {
    min-width: 120px;
}

.form-description {
    margin-top: 10px;
    /* margin: auto; */
}

.form-textarea {
    height: 110px;
    max-height: 296px;
    min-height: 65px;
}

.form-input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.form-input.not-empty {
    font-weight: bolder;
}

.form-icon {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

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