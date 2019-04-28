<template>
    <div id="addExam">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item style="margin-left:10px;" index="1">添加试题</el-menu-item>
            <el-menu-item style="margin-left:10px;" index="2">题型管理</el-menu-item>
            <el-menu-item index="3">添加考卷</el-menu-item>
        </el-menu>
        <div class="viewContainer">
            <transition name="viewFade" mode="out-in">
                <!-- 添加试题 -->
                <add-subject v-if="activeIndex == '1'" />
                <manage-Type v-if="activeIndex == '2'" />
            </transition>
        </div>
    </div>
</template>

<script>
import addSubject from '../components/addExam/addSubject'
import manageType from '../components/addExam/manageType'
export default {
    data(){
        return{
            activeIndex : '1'
        }
    },
    methods:{
        handleSelect(key , keyPath){
            this.activeIndex = key;
            console.log(this.activeIndex);
        }
    },
    components:{
        addSubject ,
        manageType
    }
}
</script>
