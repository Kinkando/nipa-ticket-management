<template>
    <div class="content">
        <!-- Modal content -->
        <!-- <div class="modal-content" v-show="modal">
            <div class="modal-header">
                <span class="close" @click="modal=false">&times;</span>
            </div>
            <div class="modal-body">
                <p>Some text in the Modal Body</p>
                <p>Some other text...</p>
            </div>
            <div class="modal-footer">
                <h3>Modal Footer</h3>
            </div>
        </div> -->


        <b-overlay :show="loading" rounded="sm" class="p-4 card-wrap">
            <!-- <div class="loading" v-if="loading">
                <div class="loader"></div>
            </div> -->
            <!-- <div class="dialog">
                <div class="success-dialog" v-show="status!=undefined && status">
                    Success
                </div>
                <div class="failed-dialog" v-show="status!=undefined && !status">
                    Failed
                </div>
            </div> -->

            <b-form @submit.prevent="onSubmit">
                <div
                    v-for="(item, key) in contact"
                    :key="key"
                >
                    <!-- <b-form-group
                        :label="label(key)"
                        :label-for="key"
                        label-cols-lg="1"
                        style="background:red;"
                    > -->
                        <div class="d-flex mb-2">
                            <span :class="key === 'description' ? 'form-description' : 'form-title m-auto'">
                                {{ label(key) }}
                            </span>
                            <b-input-group-prepend is-text  class="form-icon">
                                <b-icon :icon="icons[key]"></b-icon>
                            </b-input-group-prepend>
                            <b-form-textarea
                                class="form-input form-textarea"
                                v-if="key=='description'"
                                v-model="contact[key]"
                                required
                            />
                            <b-form-input
                                class="form-input"
                                v-else
                                v-model="contact[key]"
                                required
                                :type="['title', 'name'].includes(key) ? 'text' : key"
                                :maxlength="key === 'tel' ? '10' : ''"
                                :minlength="key === 'tel' ? '10' : ''"
                            />
                        </div>
                    <!-- </b-form-group> -->
                </div>
                <div class="d-flex justify-content-center">
                    <b-button type="submit" class="mt-2" variant="success" v-b-modal.modal-1>Submit</b-button>
                </div>
            </b-form>
        </b-overlay>
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
            icons: {
                title: 'tag-fill',
                description: "chat-square-text-fill",
                name: "person-fill",
                tel: "telephone-fill",
                email: "envelope-fill",
            },
            loading: false,
            status: undefined,
            modal: true,
        };
    },
    methods: {
        label(name) {
            name = name.charAt(0).toUpperCase() + name.substring(1); // Capital letter in first word
            let index; // Capital letter in each new word
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
            this.status = result.data.status;

            // Reset form when contact success
            if(this.status) {
                //Iterate through each object field, key is name of the object field`
                Object.keys(this.contact).forEach((key) => this.contact[key] = '');
            }

            // Show dialog for 3 seconds, then clear status to close dialog
            setTimeout( () => this.status = undefined, 2000);
        },
    },
}
</script>

<style scoped>
.content {
    width: 100%;
    height: 100vh;
    padding: 20px;
}

.card-wrap {
    overflow: hidden;
    max-width: 600px;
    border-radius: 20px;
    background-color: #eee;
    box-shadow: 2px 2px 1px 1px #333;
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

/* Modal Header */
.modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

/* Modal Body */
.modal-body {
    padding: 2px 16px;
}

/* Modal Footer */
.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
}


.dialog {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    background: red;
}

.dialog-center {
    /* display: flex;
    align-items: center;
    justify-content: center; */
}

.success-dialog {
    background-color: green;
}

.failed-dialog {
    background-color: red;
} 

</style>