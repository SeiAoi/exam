<template>
    <div id="login">
        <div class="logo">
            <span class="logoName">
                {{ this.nowType }}
            </span>
            <div class="logoText">
                <p>Welcome To SeiAoi Website.</p>
                <p v-if="nowType == 'Login'">Please enter your account number to login.</p>
                <p v-else-if="nowType == 'Regist'">Please regist your account to login.</p>
                <p>Thanks.</p>
            </div>
        </div>
        <transition name="loginFade" mode="out-in">
            <login @regist='change' v-if="nowType == 'Login'" />
            <register @login='change' v-else-if="nowType == 'Regist'" />
        </transition>
    </div>
</template>

<script>
import login from '../components/login/login'
import register from '../components/login/register'
export default {
    data(){
        return{
            nowType : 'Login'
        }
    },
    created(){
        
    },
    mounted(){

    },
    methods:{
        change(type){
            this.nowType = type;
        }
    },
    components:{
        login ,
        register
    }
}
</script>
