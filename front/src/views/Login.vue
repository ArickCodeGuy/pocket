<template>
    <div id="Login">
        <div class="container">
            <h1 class="header">Login</h1>
            <form
                class="form"
                @submit.prevent="validate"
            >
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
                    @click="validate"
                    value="Login"
                />
                <div id="error-info" v-if="form.error.value">{{form.error.value}}</div>
            </form>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent ({
    data() {
        return {
            form: {
                login: {
                    value: null,
                    status: true,
                },
                password: {
                    value: null,
                    status: true,
                },
                error: {
                    value: null
                }
            }
        }
    },
    beforeMount() {
        this.$store.dispatch('checkStatus')
            .then(() => this.$store.state.loged ? this.$router.push('/game/'): false)
            .catch(err => console.log(err))
    },
    methods: {
        changeStatus(ref) {
            ref.status = true
        },
        validate() {
            if (!this.form.login.value) {this.form.login.status = false}
            if (!this.form.password.value) {this.form.password.status = false}

            if (!this.form.login.status || !this.form.password.status) {return}

            this.doLogin()
        },
        doLogin() {
            this.$store.dispatch('doLogin', {
                login: this.form.login.value,
                password: this.form.password.value
            })
                .then(() => {
                    this.$router.push('/game/')
                })
                .catch((err) => {
                    this.form.error.value = err
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