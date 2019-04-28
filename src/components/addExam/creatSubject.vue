<template>
    <div class="creatSubject">
        <!-- 创建新试题 -->
        <form class="creatForm" autocomplete="off">
            <div class="subName">
                <span class="name">试题类型 : </span>
                <el-select class="subType" @change="clear(form.type)" v-model="form.type" placeholder="请选择">
                    <el-option
                        v-for="item in typeUl"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="subName">
                <span class="name">试题题目 : </span>
                <el-input clearable class="creatInp" v-if="form.type != 3" v-model="form.name" placeholder="请输入题目"></el-input>
                <el-input class="creatInp" @blur="threeAnswerJudge(form.name)" v-else v-model="form.name" placeholder="请输入题目,以_来标识。例:今年是_年？有_天？"></el-input>
            </div>
            <div class="subName">
                <span class="name">试题分类 : </span>
                <el-select class="subType" v-model="form.label" placeholder="请选择">
                    <el-option
                        v-for="item in subjectTypeUl"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="subName">
                <span class="name">试题等级 : </span>
                <el-cascader
                    class="creatCascader" 
                    :options="levals"
                    v-model="form.level">
                </el-cascader>
            </div>
            <!-- 单选题答案 -->
            <div v-if="form.type === 0" class="zeroAnswer">
                <span class="name">试题答案 : </span>
                <ul class="zeroUl">
                    <li class="zeroLi" v-for="(item , index) in zeroAnswers.answer" :key="index">
                        <el-radio v-model="zeroAnswers.isTrue" :label="item.id">{{item.id == zeroAnswers.isTrue ? '正确' : '错误'}}</el-radio>
                        <el-input v-model="item.label" class="zeroValue" placeholder="请输入内容"></el-input>
                        <div @click="addZeroAnswer()" v-if="item.id == zeroAnswers.answer.length - 1" class="addAnswer">
                            +
                        </div>
                        <div @click="delZeroAnswer()" v-if="item.id == zeroAnswers.answer.length - 1" class="delAnswer">
                            -
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 多选题答案 -->
            <div v-else-if="form.type === 1" class="zeroAnswer">
                <span class="name">试题答案 : </span>
                <ul class="zeroUl">
                    <li class="zeroLi" v-for="(item , index) in oneAnswers.answer" :key="index">
                        <el-checkbox v-model="item.isTrue">{{item.isTrue ? '正确' : '错误'}}</el-checkbox>
                        <el-input v-model="item.label" class="zeroValue" placeholder="请输入内容"></el-input>
                        <div @click="addOneAnswer()" v-if="item.id == oneAnswers.answer.length - 1" class="addAnswer">
                            +
                        </div>
                        <div @click="delOneAnswer()" v-if="item.id == oneAnswers.answer.length - 1" class="delAnswer">
                            -
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 判断题答案 -->
            <div v-else-if="form.type === 2" class="zeroAnswer">
                <span class="name">试题答案 : </span>
                <el-radio style="line-height:60px;margin-left:20px;" v-model="twoAnswer" label="0">正确</el-radio>
                <el-radio style="line-height:60px;" v-model="twoAnswer" label="1">错误</el-radio>
            </div>
            <!-- 填空题答案 -->
            <div v-else-if="form.type === 3 && this.threeAnswer.length > 0" class="zeroAnswer">
                <span class="name">试题答案 : </span>
                <ul class="zeroUl">
                    <li class="zeroLi" v-for="(item , index) in threeAnswer" :key="index">
                        <span style="color:rgb(50,50,50);font-size:18px;line-height:60px;margin-right:10px;">{{index+1}}.</span><el-input v-model="item.label" class="zeroValue" placeholder="请输入内容"></el-input>
                    </li>
                </ul>
            </div>
            <!-- 问答题答案 -->
            <div v-else-if="form.type === 4" class="zeroAnswer">
                <span class="name">试题答案 : </span>
                <el-input
                    class="textareas"
                    resize="none"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入答案"
                    v-model="form.answer">
                </el-input>
            </div>
            <el-button class="addBtn" @click="subSubject" plain>新增题目</el-button>
        </form>
        <!-- 展示窗口 -->
        <!-- <div class="showWindow">
            <div class="subjectContainer">
                <div class="title">

                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { addSubject , getSubjectType } from '../../server/getData.js';
export default {
    data(){
        return{
            form:{
                name : '' ,
                label : '' ,
                type : '' ,
                level : [] ,
                answer : '' ,
            },
            typeUl:[
                {
                    label : '单选题' ,
                    value : 0
                },
                {
                    label : '多选题' ,
                    value : 1
                },
                {
                    label : '判断题' ,
                    value : 2
                },
                {
                    label : '填空题' ,
                    value : 3
                },
                {
                    label : '问答题' ,
                    value : 4
                },
            ],
            subjectTypeUl:[],
            levals:[
                {
                    value : 'primarySchool' ,
                    label : '小学' ,
                    children : [
                        {
                            value : '1' ,
                            label : '一年级'
                        },
                        {
                            value : '2' ,
                            label : '二年级'
                        },
                        {
                            value : '3' ,
                            label : '三年级'
                        },
                        {
                            value : '4' ,
                            label : '四年级'
                        },
                        {
                            value : '5' ,
                            label : '五年级'
                        },
                        {
                            value : '6' ,
                            label : '六年级'
                        },
                    ]
                },
                {
                    value : 'middleSchool' ,
                    label : '初中' ,
                    children : [
                        {
                            value : '1' ,
                            label : '一年级'
                        },
                        {
                            value : '2' ,
                            label : '二年级'
                        },
                        {
                            value : '3' ,
                            label : '三年级'
                        }
                    ]
                },
                {
                    value : 'highSchool' ,
                    label : '高中' ,
                    children : [
                        {
                            value : '1' ,
                            label : '一年级'
                        },
                        {
                            value : '2' ,
                            label : '二年级'
                        },
                        {
                            value : '3' ,
                            label : '三年级'
                        }
                    ]
                },
            ],
            zeroAnswers:{
                isTrue : 0 ,
                answer : [
                    {
                        id : 0 ,
                        label : ''
                    },
                    {
                        id : 1 ,
                        label : ''
                    }
                ]
            },
            oneAnswers:{
                answer : [
                    {
                        id : 0 ,
                        label : '' ,
                        isTrue : true
                    },
                    {
                        id : 1 ,
                        label : '' ,
                        isTrue : false
                    },
                ]
            },
            twoAnswer : '0' ,
            threeAnswer : [] ,
        }
    },
    mounted(){
        this.getSubjectTypeData();
    },
    methods:{
        async subSubject(){
            let judgeType = await this.subJudge();
            console.log(judgeType);
            if(judgeType !== false){
                this.form.answer = judgeType;
                let user = window.localStorage.getItem("seiaoi");
                this.form.createMan = user;
                let result = await addSubject(this.form);
                if(result.code == 200){
                    this.clear(this.form.type);
                    this.$message('新增成功！');
                    this.$emit('refreshData');
                }else{
                    this.$message.error('出错了，请稍后重试！');
                }
                console.log(this.form);
            }
        },
        addZeroAnswer(){
            if(this.zeroAnswers.answer.length <= 3){
                this.zeroAnswers.answer.push({
                    id : this.zeroAnswers.answer.length ,
                    label : ''
                })
            };
        },
        delZeroAnswer(){
            if(this.zeroAnswers.answer.length-1 >= 2){
                if(this.zeroAnswers.isTrue == this.zeroAnswers.answer.length - 1){
                    this.zeroAnswers.isTrue = this.zeroAnswers.answer.length - 2;
                }
                this.zeroAnswers.answer.splice(this.zeroAnswers.answer.length-1 , 1);
            }
        },
        addOneAnswer(){
            if(this.oneAnswers.answer.length <= 3){
                this.oneAnswers.answer.push({
                    id : this.oneAnswers.answer.length ,
                    label : '' ,
                    isTrue : false
                })
            }
        },
        delOneAnswer(){
            if(this.oneAnswers.answer.length - 1 >= 2){
                this.oneAnswers.answer.splice(this.oneAnswers.answer.length-1 , 1);
            }
        },
        threeAnswerJudge(text){
            if(text.length > 0){
                let str="SH_20181030_1_25000";
                let a=text.length;        
                let str1 = text.replace(/\_+/g,"")
                let b=str1.length;
                let c=a-b;
                // 如果判断题还没有填空的时候，则一次添加完成。
                if(this.threeAnswer.length == 0){
                    for(let i = 0 ; i < c ; i++){
                        this.threeAnswer.push({
                            id : i ,
                            label : ''
                        });
                    }
                // 如果填空题的答案数量小于下划线数量则增加
                }else if(this.threeAnswer.length < c){
                    for(let i = 0 ; i < c - this.threeAnswer.length ; i++){
                        this.threeAnswer.push({
                            id : i + this.threeAnswer.length ,
                            label : ''
                        });
                    }
                // 如果填空题答案数量大于下划线数量则减少
                }else if(this.threeAnswer.length > c){
                    let len = this.threeAnswer.length;
                    for(let i = 0 ; i < len - c; i++){
                        this.threeAnswer.splice(this.threeAnswer.length - 1 , 1);
                    }
                }
            }else{
                this.threeAnswer = [];
            }
            console.log(this.threeAnswer);
        },
        clear(type){
            this.form = {
                name : '' ,
                label : '' ,
                type : type ,
                level : [] ,
                answer : '' ,
            };
            this.zeroAnswers = {
                isTrue : 0 ,
                answer : [
                    {
                        id : 0 ,
                        label : ''
                    },
                    {
                        id : 1 ,
                        label : ''
                    }
                ]
            };
            this.oneAnswers = {
                answer : [
                    {
                        id : 0 ,
                        label : '' ,
                        isTrue : true
                    },
                    {
                        id : 1 ,
                        label : '' ,
                        isTrue : false
                    },
                ]
            };
            this.twoAnswer = '0' ;
            this.threeAnswer = []
        },
        subJudge(){
            if(this.form.name === ''){
                this.$message.error('请正确填写名称！');
                return false;
            }else if(this.form.type === ''){
                this.$message.error('请选择试题类型！');
                return false;
            }else if(this.form.label === ''){
                this.$message.error('请正确填写分类！');
                return false;
            }else if(this.form.level === ''){
                this.$message.error('请选择试题等级！');
                return false;
            };
            switch(this.form.type){
                // 单选题验证
                case 0 :
                    for(let i = 0 ; i < this.zeroAnswers.answer.length ; i++){
                        if(this.zeroAnswers.answer[i].label === ''){
                            this.$message.error(`请正确填写答案${i+1}！`);
                            return false ;
                        }
                    }
                    return this.zeroAnswers;
                    break;
                // 多选题验证
                case 1 :
                    for(let i = 0 ; i < this.oneAnswers.answer.length ; i++){
                        if(this.oneAnswers.answer[i].label === ''){
                            this.$message.error(`请正确填写答案${i+1}！`);
                            return false ;
                        }
                    }
                    let count = 0;
                    for(let i = 0 ; i < this.oneAnswers.answer.length ; i++){
                        if(this.oneAnswers.answer[i].isTrue == true){
                            count += 1;
                        }
                    }
                    if(count === 0){
                        this.$message.error(`请选择一项正确答案！`);
                        return false;
                    }
                    return this.oneAnswers;
                    break;
                case 2 :
                    return this.twoAnswer;
                    break;
                // 填空题验证
                case 3 :
                    if(this.threeAnswer.length == 0){
                        this.$message.error(`请正确填写题目！`);
                        return false;
                    }
                    for(let i = 0 ; i < this.threeAnswer.length ; i++){
                        if(this.threeAnswer[i].label === ''){
                            this.$message.error(`请正确填写答案${i+1}！`);
                            return false ;
                        }
                    }
                    return this.threeAnswer;
                    break;
                // 问答题验证
                case 4 :
                    if(this.form.answer === ''){
                        this.$message.error(`请正确填写答案！`);
                        return false ;
                    }
                    return this.form.answer;
                    break;
                default : 
                    return false;
            }
        },
        async getSubjectTypeData(){
            this.subjectTypeUl = [];
            let result = await getSubjectType({});
            if(result.code == 200){
                for(let i = 0 ; i < result.data.length ; i++){
                    this.subjectTypeUl.push({
                        label : result.data[i].name ,
                        value : result.data[i].id
                    })
                }
            }
        }
    },
}
</script>
                    
