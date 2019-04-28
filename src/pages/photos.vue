<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="姓名"
            width="120">
            </el-table-column>
            <el-table-column
            prop="province"
            label="省份"
            width="120">
            </el-table-column>
            <el-table-column
            prop="zip"
            label="邮编"
            width="120">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      handleChange(value) {
        console.log(value);
      }
    },

    data() {
      return {
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
            }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1517 弄',
            zip: 200333
            }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1519 弄',
            zip: 200333
            }, {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1516 弄',
            zip: 200333
        }] ,
        num1: 1
      }
    }
};
</script>
