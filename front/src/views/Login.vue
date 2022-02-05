<template>
    <div id="Login">
        <Header :showFake="true"/>
        <div class="content">
            <div class="container">
                <h1 class="heading">{{ form.option.value }}</h1>
                <form
                    class="form"
                    @submit.prevent="validate"
                >
                    <div class="options">
                        <div @click="changeOption('Login')" :class="{'active': form.option.value === 'Login'}">Login</div>
                        <div @click="changeOption('Register')" :class="{'active': form.option.value === 'Register'}">Register</div>
                    </div>
                    <input
                        :type="form.inputs.login.type"
                        class="input"
                        :class="{ 'invalid': !form.inputs.login.status }"
                        v-model="form.inputs.login.value"
                        :placeholder="form.inputs.login.placeholder"
                        :title="form.inputs.login.title"
                        :pattern="form.inputs.login.pattern"
                        :autofocus="form.inputs.login.autofocus"
                        @input="changeStatus(form.inputs.login)"
                    />
                    <input
                        :type="form.inputs.password.type"
                        class="input"
                        :class="{ 'invalid': !form.inputs.password.status }"
                        v-model="form.inputs.password.value"
                        :placeholder="form.inputs.password.placeholder"
                        :title="form.inputs.password.title"
                        :pattern="form.inputs.password.pattern"
                        :autofocus="form.inputs.password.autofocus"
                        @input="changeStatus(form.inputs.password)"
                    />
                    <input
                        :type="form.inputs.email.type"
                        class="input"
                        :class="{ 'invalid': !form.inputs.email.status }"
                        v-model="form.inputs.email.value"
                        :placeholder="form.inputs.email.placeholder"
                        :title="form.inputs.email.title"
                        :pattern="form.inputs.email.pattern"
                        :autofocus="form.inputs.email.autofocus"
                        @input="changeStatus(form.inputs.email)"
                        v-if="form.option.value === 'Register'"
                    />
                    <input
                        class="submit"
                        type="submit"
                        :value="form.option.value"
                    />
                    <div id="error-info" v-if="form.error.value">{{form.error.value}}</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
type formInput = {
    key: string;
    type: string;
    value: string;
    pattern: string;
    title: string;
    status: boolean;
    autofocus: boolean;
}
import { defineComponent } from 'vue';
import Header from './../components/Header/index.vue'
export default defineComponent({
    components: {Header},
    data() {
        return {
            form: {
                option: {
                    value: 'Login',
                },
                inputs: {
                    login: {
                        placeholder: 'Login',
                        type: 'text',
                        value: '',
                        pattern: '^[a-z][a-z\\d]{3,}',
                        title: 'Should start with a letter, at least 4 characters long',
                        status: true,
                        autofocus: true,
                    },
                    password: {
                        placeholder: 'Password',
                        type: 'password',
                        value: '',
                        pattern: '.{4,}',
                        title: 'Should be at least 6 characters',
                        status: true,
                    },
                    email: {
                        placeholder: 'Email',
                        key: 'email',
                        type: 'email',
                        value: '',
                        pattern: '[a-zA-Z\\d]{3,}@[a-z]{3,}\\.[a-z]{2,}',
                        title: 'Input your email',
                        status: true,
                    },
                },
                error: {
                    value: ''
                }
            },
        }
    },
    async beforeMount() {
        if (this.$store.state.status === null) {
            await this.$store.dispatch('checkStatus')
            this.$store.state.status === true ? this.$router.push('/game/'): false
        }
    },
    methods: {
        changeStatus(ref: formInput) {
            ref.status = true
        },
        validate() {
            let status = true

            // login
            let loginMatch = this.form.inputs.login.value.match(new RegExp(this.form.inputs.login.pattern))
            if (loginMatch === null || (Array.isArray(loginMatch) && !(loginMatch[0] === this.form.inputs.login.value))) {
                status = false
                this.form.inputs.login.status = false
            }
            // password
            let passwordMatch = this.form.inputs.password.value.match(new RegExp(this.form.inputs.password.pattern))
            if (passwordMatch === null || (Array.isArray(passwordMatch) && !(passwordMatch[0] === this.form.inputs.password.value))) {
                status = false
                this.form.inputs.password.status = false
                console.log(passwordMatch)
            }
            // email
            if (this.form.option.value === 'Register') {
                let emailMatch = this.form.inputs.email.value.match(new RegExp(this.form.inputs.email.pattern))
                if (emailMatch === null || (Array.isArray(emailMatch) && !(emailMatch[0] === this.form.inputs.email.value))) {
                    status = false
                    this.form.inputs.email.status = false
                }
            }
            
            if (status) {
                if (this.form.option.value === 'Login') {
                    this.doLogin()
                }else {
                    this.doRegister()
                }
            }
        },
        hashPas(string: string) {
            return string
        },
        doLogin() {
            this.$store.dispatch('doLogin', {
                login: this.form.inputs.login.value,
                password: this.form.inputs.password.value
            })
                .then(() => {
                    this.$router.push('/game/')
                })
                .catch((err: string) => {
                    this.form.error.value = err
                })
        },
        doRegister() {
            let data = new FormData()
            data.append('login', this.form.inputs.login.value)
            data.append('login', this.form.inputs.password.value)
            data.append('login', this.form.inputs.email.value)
            fetch(`/api/users/`, {
                method: 'POST',
                body: data
            })
                .then(res => {
                    if (!res.ok) {throw res.text()}
                    this.doLogin();
                })
                .catch(async (err: string) => {
                    this.form.error.value = await err
                })
        },
        changeOption(str: string) {
            this.form.option.value = str
        }
    }
})
</script>

<style lang="scss" scoped>
    #Login {
        .content {
            padding: 40px 0;
        }
        .container {
            width: 500px;
        }
        .form {
            margin-left: auto;
            margin-right: auto;
            display: grid;
            grid-gap: 30px;
        }
        .options {
            display: flex;
            > * {
                cursor: pointer;
                width: 100%;
                padding: 10px;
                text-align: center;
                &.active, &:hover {
                    background-color: var(--block-color);
                }
            }
            input {
                display: none;
            }
        }
        .input {
            width: 100%;
            padding: 15px 10px;
            border: 1px solid transparent;
            border-radius: 5px;
            border-bottom: 1px solid #0F0F0F;
            &:focus {
                outline: none;
                box-shadow: 0 0 5px 1px var(--block-color);
            }
            &.invalid, &:invalid {
                border: 1px solid red;
                color: red;
            }
        }
        .submit {
            appearance: none;
            position: relative;
            top: 0;
            border-radius: 5px;
            padding: 10px;
            font-weight: bold;
            text-align: center;
            background-color: var(--block-color);
            color: var(--color-primary);
            font-size: 1.2rem;
            cursor: pointer;
            transition: .3s;
            box-shadow: 0 5px var(--block-shadow-light);
            border: none;
            &:hover {
                background-color: var(--block-color-hover);
            }
            &:focus {
                outline: none;
            }
            &:active {
                top: 5px;
                box-shadow: 0 0 var(--block-shadow-light);
            }
        }
        #error-info {
            border: 1px solid red;
            padding: 15px 10px;
            border-radius: 3px;
        }
        @media (min-width: 768px) {
            .content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>