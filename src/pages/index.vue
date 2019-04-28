<template>
    <div id="index">
        <div class="leftMain">
            <div class="logo" @click="logoClick">
                <span class="amp">&amp;</span>
                <p class="seiaoi"><span style="font-size:30px;color:#409EFF;">S</span>eiAoi</p>
                <p class="satsuki"><span style="font-size:30px;color:#FFCCCC;">S</span>atsuki</p>
            </div>
            <div class="chooseTitle">
                <span @click="changePath(item.name)" class="chooseItem" v-for="(item , index) in pathItem" :key="index">{{item.name}}</span>
            </div>
        </div>
        <div class="rightMain">
            <transition name="fade" mode="out-in">
                <!-- v-if判断可以清空数据，下次进入时重新触发created事件。 -->
                <add-exam v-if="nowPath == '添加考试'" />
                <photos v-if="nowPath == 'photo'" />
            </transition>
        </div>
    </div>
</template>

<script>
import addExam from './addExam'
import photos from './photos'
export default {
    data(){
        return{
            pathItem : [
                {
                    name : '添加考试' 
                },
                {
                    name : 'photo' 
                },
                {
                    name : 'story' 
                },
                {
                    name : 'cat' 
                },
                {
                    name : 'daily' 
                },
                {
                    name : 'more' 
                },
                {
                    name : 'curriculumVitae'
                },
            ],
            nowPath : '添加考试'
        }
    },
    mounted(){
        if(localStorage.getItem('seiaoi') == null){
            this.$router.push({
                path: `/login`
            })
        }
    },
    methods : {
        logoClick(){
            this.$router.push({
                path: `/index`
            })
        },
        changePath(name){
            this.nowPath = name ;
        }
    },
    components:{
        addExam ,
        photos
    }
}
</script>

