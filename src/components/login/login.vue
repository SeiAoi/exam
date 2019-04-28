<template>
    <div class="loginMain">
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
        <div class="btnBox">
            <div class="registBtn" @click="registClick">
                Regist
            </div>
            <div class="loginBtn" @click="subClick">
                Login
            </div>
        </div>
    </div>
</template>

<script>
import { login , test } from '../../server/getData.js'
export default {
    data(){
        return{
            loginBacStyle : {
                height : '100%'
            },
            userAcount : '' ,
            userPassword : '' ,
            dialogBoxType : false
        }
    },
    created(){
        
    },
    mounted(){

    },
    methods : {
        async subClick(){
            if(this.loginJudge(this.userAcount , 'account') && this.userPassword){
                console.log('登陆中...');
                let loginUser = {
                    account : this.userAcount ,
                    password : this.userPassword 
                }
                let result = await login(loginUser)
                if(result.type){
                    localStorage.setItem('seiaoi', result.user);
                    this.$router.push({
                        path: `/index`
                    })
                }else{
                    console.log('登陆失败请重试!');
                    this.$message.error('登陆失败请重试!');
                }
            }else{
                console.log('账号或密码输入不正确，请重新填写!');
                this.$message.error('账号或密码输入不正确，请重新填写!');
            }
        },
        registClick(){
            this.userAcount = '' ;
            this.password = '' ;
            this.$emit('regist' , 'Regist');
        },
        loginJudge(data , type){
            switch(type){
                case 'account' : 
                    let re = /^\d{6,12}$/ ;
                    if(re.test(data)){
                        return true ;
                    }else{
                        return false ;
                    }
                    break;
            }
        },
        getNowDate(){
            let date = new Date();
            let year = date.getFullYear(); // 年
            let month = date.getMonth() + 1; // 月
            let strDate = date.getDate(); // 日
            let hour = date.getHours(); // 时
            let minute = date.getMinutes(); // 分
            let second = date.getSeconds(); // 秒
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minute >= 0 && minute <= 9) {
                minute = "0" + minute;
            }
            if (second >= 0 && second <= 9) {
                second = "0" + second;
            }
            let currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
            return currentdate ;
        }
    },
}
</script>
