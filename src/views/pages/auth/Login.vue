<template>
  <div class="w-100 h-100 login-layout d-flex justify-content-center align-items-center">
    <div class="login-form p-3 text-center">
        <form action="" @submit.prevent = "login">
            <h5>Login</h5>
            <a-input placeholder = "Enter name ..." class="mt-3" v-model:value = "userLogin.name"></a-input>
            <a-input type = "password" placeholder = "Enter password ..." class="mt-3" v-model:value = "userLogin.password"></a-input>

            <button class="btn btn-sm btn-primary mt-3 w-100">
                Login
            </button>
        </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { authStore } from "../../../store"
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
 
const userLogin = reactive({})
const router = useRouter();
const login = async() => {
    let response  =  await authStore().login(userLogin);
    if(response.status)
    {
        message.success('Login successful');
        router.push({
            name: "PronounCheck",
        })
    }
}
</script>

<style lang="scss" scoped>
.login-layout{
    min-height: 100vh;
}
.login-form{
    height: 250px;
    width: 400px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 20px;
}
</style>