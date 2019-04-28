<template>
    <div class="addSubject">
        <div class="subjectTitle">
            <span class="titleName">试题类型</span>
            <div @click="addModel('creat')" v-if="addType == 'showAll'" class="addSubjectType">
               + 添加试题
            </div>
            <div @click="addModel('showAll')" v-if="addType == 'creat'" class="addSubjectType">
               返 回
            </div>
        </div>
        <div class="subjectContainer">
            <div :class="addType=='showAll' ? 'showAllSubject' : 'closeShow'">
                <!-- <creat-subject /> -->
                <show-all-subject :showData='showData' />
            </div>
            <div :class="addType=='showAll' ? 'closeCreat' : 'creatSubject'">
                <!-- <show-all-subject /> -->
                <creat-subject @refreshData='refreshData' />
            </div>
        </div>
        

    </div>
</template>

<script>
import { getAllSubjectType } from '../../server/getData.js';
import showAllSubject from './showAllSubject' ;
import creatSubject from './creatSubject' ;
export default {
    data(){
        return{
            addType : 'showAll' ,
            showData : []
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        addModel(type){
            this.addType = type ;
        },
        async getData(){
            let result = await getAllSubjectType();
            if(result.code == 200){
                this.showData = result.data;
            }
        },
        refreshData(){
            this.getData();
        }
    },
    components:{
        creatSubject ,
        showAllSubject ,
    }
}
</script>
