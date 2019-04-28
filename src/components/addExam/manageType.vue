<template>
    <div class="manageType">
        <div class="addSubjectTypeBtn" >
            <el-button type="primary" @click="openDia" plain>添加试题类型</el-button>
        </div>
        <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%">
            <el-table-column
            label="添加日期"
            width="200">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="试题类型"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="新增试题类型"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="subjectTypeForm">
                <span>试题类型 ：</span><el-input v-model="addValue" style="width:80%;" placeholder="请输入试题类型"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="subType">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getSubjectType , addSubjectType } from '../../server/getData.js';
export default {
    data(){
        return{
            tableData : [],
            loading: false ,
            dialogVisible : false ,
            addValue : ''
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        handleEdit(index , item){
            // 修改
        },
        handleDelete(index ,item){
            // 删除
        },
        handleClose(){
            // 关闭弹框后事件
            this.addValue = '' ;
            this.dialogVisible = !this.dialogVisible;
        },
        openDia(){
            this.dialogVisible = !this.dialogVisible;
        },
        async subType(){
            if(this.addValue !== ''){
                let result = await addSubjectType({
                    'name' : this.addValue
                });
                if(result.code == 200){
                    this.$message('新增成功！');
                    this.handleClose();
                    this.getData();
                }else{
                    this.$message.error('出错啦！请稍后再试！');
                }
            }else{
                this.$message.error('请正确填写试题类型！');
            }
        },
        async getData(){
            this.loading = !this.loading;
            let result = await getSubjectType({});
            if(result.code == 200){
                console.log(result);
                this.tableData = result.data;
                this.loading = !this.loading;
            }else{
                this.$message.error('出错啦！请稍后再试！');
                this.loading = !this.loading;
            }
        }

    }
}
</script>
