<template>
    <div class="showAllSubject" >
        <!-- 查看所有试题类型 -->
        <transition name="subjectWatchFade" mode="out-in">
            <ul v-if="isView == true" class="subjectUl">
                <li class="subjectLi" v-for="(item , index) in testSubjectType" :key="index">
                    <div class="title">
                        <span class="titleName">{{item.name}}</span>
                    </div>
                    <div class="content">
                        <span class="subCount">当前题数 : {{item.num}}</span>
                        <el-button @click="watchTheSubject(item.id)" class="seeSubject" plain>查看试题</el-button>
                    </div>
                </li>
            </ul>
            <div v-if="isView == false" class="watchContainer">
                <div class="isData">
                    <!-- 搜索 -->
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="题名">
                            <el-input v-model="formInline.name" placeholder="请输入要查询的题名"></el-input>
                        </el-form-item>
                        <el-form-item label="时间">
                            <el-date-picker
                                v-model="formInline.times"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="题型">
                            <el-input v-model="formInline.name" placeholder="请输入要查询的题型"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSerch">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- 列表 -->
                    <el-collapse accordion>
                        <el-collapse-item v-for="(item , index) in subjects" :key="index">
                            <template slot="title">
                                <!-- 题型: Consistency -->
                                <span style="margin-right:20px;">创建时间 ：{{item.createTime}}</span>
                                <span style="margin-right:20px;">试题类型 : {{item.subType}}</span>
                                <span>试题名称 ：{{item.name.substr(0,15)}}</span>
                            </template>
                            <div style="position:relative;">
                                <span style="margin-right:20px;">试题创建人: 青葵</span><span style="margin-right:20px;">试题修改人 : {{item.updateMan != 'null' ? item.updateMan : '未修改'}}</span><span>修改时间 : {{item.updateTime != 'null' ? item.updateTime : '未修改'}}</span>
                                <div class="toolBtn">
                                    <el-button @click="updateSubs(item)" type="primary" icon="el-icon-edit" circle></el-button>
                                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                                </div>
                            </div>
                            <div><span>试题名 : {{item.name}}</span></div>
                            <!-- 单选题答案 -->
                            <div v-if="item.subjectType == '0'" class="answerShow0">
                                <span>试题选项 : </span>
                                <span style="margin-left:20px;" v-for="(shows , idx) in item.answer.answer" :key="idx">{{englishWord[shows.id]}} . {{shows.label}}</span>
                                <span>正确答案 : {{item.answer.trueAnswer}}</span>
                            </div>
                            <!-- 多选题答案 -->
                            <div v-if="item.subjectType == '1'" class="answerShow0">
                                <span>试题选项 : </span>
                                <span style="margin-left:20px;" v-for="(shows , idx) in item.answer.answer" :key="idx">{{englishWord[shows.id]}} . {{shows.label}}</span>
                                <span>正确答案 : </span>
                                <span style="margin-left:20px;" v-for="(trues , idxs) in item.answer.trueAnswer" :key="idxs+2*100">{{trues}}</span>
                            </div>
                            <!-- 判断题答案 -->
                            <div v-if="item.subjectType == '2'" class="answerShow0">
                                <span>正确答案 : </span>
                                <span style="margin-left:20px;">{{item.answer === '0' ? "正确":"错误"}}</span>
                            </div>
                            <!-- 填空题答案 -->
                            <div v-if="item.subjectType == '3'" class="answerShow0">
                                <span>正确答案 : </span>
                                <span style="margin-left:20px;" v-for="(shows , ids) in item.trueAnswer" :key="ids">{{ids+1}} . {{shows}}</span>
                            </div>
                            <!-- 问答题答案 -->
                            <div v-if="item.subjectType == '4'" class="answerShow0">
                                <span>正确答案 : </span>
                                <span style="margin:0 20px;word-break:normal; width:auto; display:block; white-space:pre-wrap;word-wrap : break-word ;">{{item.answer}}</span>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div style="text-align:center;margin-top:20px;">
                    <el-button @click='comeBack()' type="warning">返 回</el-button>
                </div>
                <!-- 修改表单 -->
                <!-- 这里很麻烦，要判断是修改什么类型的试题，展示不同的表单，多重判断，没有做。 -->
                <el-dialog title="修改试题" :visible.sync="editFormType">
                    <el-form :model="editForm">
                        <el-form-item label="试题名称" :label-width="formLabelWidth">
                            <el-input v-model="editForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="试题答案" :label-width="formLabelWidth">
                            <el-input v-model="editForm.answer" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editFormType = false">取 消</el-button>
                        <el-button type="primary" @click="editFormType = false">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </transition>
    </div>
</template>

<script>
import { getSomeSubjects , updateSubject } from '../../server/getData.js';
export default {
    data(){
        return{
            testSubjectType : [] ,
            isView : true ,
            subjects : [] ,
            formInline : {
                name : '' ,
                times : ''
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            englishWord : ['A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G'] ,
            nowId : '',
            editFormType : false ,
            editForm : {
                name : '' ,
                answer : ''
            } ,
            formLabelWidth: '120px'
        }
    },
    props:['showData'],
    mounted(){
        this.testSubjectType = this.showData;
    },
    watch:{
        'showData' : function(){
            this.testSubjectType = this.showData;
        }
    },
    methods:{
        async watchTheSubject(id){
            this.nowId = id ;
            let result = await getSomeSubjects({
                'id' : id
            });
            if(result.code == 200){
                for(let i = 0 ; i < result.data.length ; i++){
                    result.data[i].answer = JSON.parse(result.data[i].answer);
                    switch(result.data[i].subjectType){
                        case '0' : 
                            result.data[i].subType = '单选题'
                            for(let j = 0 ; j < result.data[i].answer.answer.length ; j++){
                                if(result.data[i].answer.isTrue == result.data[i].answer.answer[j].id){
                                    result.data[i].answer.trueAnswer = this.englishWord[result.data[i].answer.answer[j].id] + ' . ' + result.data[i].answer.answer[j].label;
                                }
                            }
                            break;
                        case '1' : 
                            result.data[i].subType = '多选题'
                            let answerArr = [];
                            for(let j = 0 ; j < result.data[i].answer.answer.length ; j++){
                                if(result.data[i].answer.answer[j].isTrue){
                                    answerArr.push(this.englishWord[result.data[i].answer.answer[j].id] + ' . ' + result.data[i].answer.answer[j].label);
                                }
                            }
                            result.data[i].answer.trueAnswer = answerArr;
                            break;
                        case '2' : 
                            result.data[i].subType = '判断题'
                            break;
                        case '3' : 
                            result.data[i].subType = '填空题'
                            let trueAnswerArr = [];
                            for(let j = 0 ; j < result.data[i].answer.length ; j++){
                                trueAnswerArr.push(result.data[i].answer[j].label);
                            };
                            result.data[i].trueAnswer = trueAnswerArr;
                            break;
                        case '4' : 
                            result.data[i].subType = '问答题'
                            break;
                    }
                }
                this.subjects = result.data;
                this.isView = false;
            }
            console.log(this.subjects , 'this.subjects');
        },
        onSerch(){

        },
        comeBack(){
            this.isView = true;
            this.subjects = [];
        },
        // 修改试题
        async updateSubs(item){
            this.editFormType = !this.editFormType;
            console.log(item);
            // console.log(item);
            // let result = await updateSubject({
            //     'subject' : item
            // })
            // if(result.code == 200){
            //     this.watchTheSubject(this.nowId);
            // }
            // console.log(result);
        }
    }
}
</script>
