<template>
    <div class="registMain">
        <div class="picBox">
            <div class="userPic">

            </div>
        </div>
        <div class="inputBox">
            <img class="inputIcon" src="../../../static/images/account.png" alt="Acount" />
            <form autocomplete="off" style="height:100%;" >
                <input class="loginStyle" v-model="userAcount" :maxlength="12" type="text" />
            </form>
        </div>
        <div class="inputBox">
            <img class="inputIcon" src="../../../static/images/password.png" alt="password" />
            <form autocomplete="off" style="height:100%;">
                <input class="inputStyle" v-model="userPassword" type="password" autocomplete="off" />
            </form>
        </div>
        <div class="inputBox">
            <img class="inputIcon" src="../../../static/images/password.png" alt="password" />
            <form autocomplete="off" style="height:100%;">
                <input class="inputStyle" v-model="userPasswordTwo" type="password" autocomplete="off" />
            </form>
        </div>
        <div class="btnBox">
            <div class="loginBtn" @click="login">
                Back
            </div>
            <div class="registBtn" @click="regist">
                Regist
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userAcount : '' ,
            userPassword : '' ,
            userPasswordTwo : '' ,
        }
    },
    methods:{
        login(){
            this.$emit('login' , 'Login');
        },
        regist(){

        }
    }
}
</script>
