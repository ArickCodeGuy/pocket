<template>
    <div id="Login">
        <div class="container">
            <h1 class="header">Login</h1>
            <form
                class="form"
                @submit.prevent="validate"
            >
                <div class="options">
                    <label :class="{'active': form.option.value === 'Login'}">Login<input type="radio" value="Login" v-model="form.option.value" /></label>
                    <label :class="{'active': form.option.value === 'Register'}">Register<input type="radio" value="Register" v-model="form.option.value" /></label>
                </div>
                <input
                    type="text"
                    class="input"
                    :class="{ 'invalid': !form.login.status }"
                    v-model="form.login.value"
                    placeholder="Login"
                    autofocus
                    @input="changeStatus(form.login)"
                >
                <input
                    type="password"
                    class="input"
                    :class="{ 'invalid': !form.password.status }"
                    v-model="form.password.value"
                    placeholder="password"
                    @input="changeStatus(form.password)"
                >
                <input
                    class="submit"
                    type="submit"
                    :value="form.option.value"
                />
                <div id="error-info" v-if="form.error.value">{{form.error.value}}</div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent ({
    data() {
        return {
            form: {
                option: {
                    value: 'Login',
                },
                login: {
                    value: '',
                    status: true,
                },
                password: {
                    value: '',
                    status: true,
                },
                error: {
                    value: ''
                }
            }
        }
    },
    beforeMount() {
        this.$store.dispatch('checkStatus')
            .then((res: any) => {
                res.loged ? this.$router.push('/game/'): false
            })
            .catch((err: string) => console.log(err))
    },
    methods: {
        changeStatus(ref: any) {
            ref.status = true
        },
        validate() {
            if (!this.form.login.value) {this.form.login.status = false}
            if (!this.form.password.value) {this.form.password.status = false}

            if (!this.form.login.status || !this.form.password.status) {return}

            if (this.form.option.value === 'Login') {
                this.doLogin()
            }else if (this.form.option.value === 'Register') {
                this.doRegister()
            }
        },
        hashPas(string: string) {
            return string
        },
        doLogin() {
            this.$store.dispatch('doLogin', {
                login: this.form.login.value,
                password: this.form.password.value
            })
                .then(() => {
                    this.$router.push('/game/')
                })
                .catch((err: string) => {
                    this.form.error.value = err
                })
        },
        doRegister() {
            fetch(`/api/users/?login=${this.form.login.value}&password=${this.form.password.value}`, {
                method: 'POST'
            })
                .then(res => {
                    if (!res.ok) {throw res.text()}
                    this.doLogin();
                })
                .catch(async (err: string) => {
                    this.form.error.value = await err
                })
        }
    }
})
</script>

<style lang="scss" scoped>
    #Login {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
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
            padding: 15px 10px;
            border: 1px solid transparent;
            border-radius: 5px;
            border-bottom: 1px solid #0F0F0F;
            &:focus {
                outline: none;
                box-shadow: 0 0 5px 1px var(--block-color);
            }
            &.invalid {
                border: 1px solid red;
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
    }
</style>