<script setup>
import { ref } from 'vue';
//数据
let queryInput = ref("");
let tableData = ref([{
  id: "1",
  name: 'Tom',
  email: "123@qq.com",
  phone: "1231234123",
  state: 'California',
  address: 'No. 189, Grove St, Los Angeles',
}, {
  id: "2",
  name: 'Tom',
  email: "123@qq.com",
  phone: "1231234123",
  state: 'California',
  address: 'No. 189, Grove St, Los Angeles',
}, {
  id: "3",
  name: 'Tom',
  email: "123@qq.com",
  phone: "1231234123",
  state: 'California',
  address: 'No. 189, Grove St, Los Angeles',
}, {
  id: "4",
  name: 'Tom',
  email: "123@qq.com",
  phone: "1231234123",
  state: 'California',
  address: 'No. 189, Grove St, Los Angeles',
},
]);

let multipleSelection = ref([])   //选中的行数据

let dialogFormVisible = ref(false);

let tableForm = ref({
  name: "张三",
  email: "sdf@qq.com",
  phone: "234234234",
  state: "正常",
  address: "洛阳市"
});

let dialogType=ref("add");


//方法

// const handleRowDel = () => {
//   tableData.value.forEach(item => item.forEach(el=>el==="id"){
//     tableData.value= tableData.value.filter(item.id != multipleSelection.value.id)
//   }
//   )
// }

//单选删除操作
  // const handleRowDel=({id})=>{  //可以使用结构赋值
    const handleRowDel=(row)=>{  //结构
    console.log(row.id)
   let index =tableData.value.findIndex(item=>item.id===row.id);  //根据ID获取数组的索引值
   tableData.value.splice(index,1);

  }
//多选删除
  const handleMultiDel=()=>{
    multipleSelection.value.forEach(item=>{
      let index =tableData.value.findIndex(del=>del.id===item.id);
      tableData.value.splice(index,1);
    })

  }

  const handleEdit=(row)=>{
dialogFormVisible.value=true;
dialogType="edit";
tableForm.value={...row}
  }

//获取多选的数据
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(val);
}
//新增btn
const handleAdd = () => {
  dialogFormVisible.value = true;
  dialogType="add";

}


//点击增加确认按钮
const dialogConfirm = () => {
  dialogFormVisible.value = false;
  if(dialogType==="add")
  {
    tableData.value.push({
    id: (tableData.value.length + 1).toString(),
    ...tableForm.value
  })
  }
  
  if(dialogType==="edit")
{
  //获取到当前的索引
  let index =tableData.value.findIndex(edit=>edit.id===tableForm.value.id);
  //将数据进行替换
  tableData.value[index]={...tableForm.value};

}

}
</script>

<template>
  <div class="table-box">

    <div class="title">
      <h2>增删改查</h2>
    </div>

    <div class="query-box">

      <el-input v-model="queryInput" placeholder="请输入搜索" width="200px" />
      <el-button type="primary" @click="handleAdd">增加</el-button>
      <el-button type="primary" @click="handleMultiDel" v-if="true">多选删除</el-button>

    </div>

    <div class="table">
      <el-table :data="tableData" style="width: 100% " ref="multipleTableRef" @selection-change="handleSelectionChange"    
        border>
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="Id" width="150" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="email" label="邮箱" width="120" />
        <el-table-column prop="phone" label="电话" width="120" />
        <el-table-column prop="state" label="状态" width="120" />
        <el-table-column prop="address" label="地址" width="120" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleRowDel(scope.row)" style="color: #F56C6C">删除</el-button>
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="请输入姓名" :label-width="formLabelWidth">
          <el-input v-model="tableForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入邮箱" :label-width="formLabelWidth">
          <el-input v-model="tableForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入电话" :label-width="formLabelWidth">
          <el-input v-model="tableForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入状态" :label-width="formLabelWidth">
          <el-input v-model="tableForm.state" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入地址" :label-width="formLabelWidth">
          <el-input v-model="tableForm.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">

          <el-button type="primary" @click="dialogConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>


  </div>
</template>

<style scoped>
.table-box {
  width: 800px;
  position: relative;
  left: 20%;
  /* right: 50%; */
}

.title {
  text-align: center;
}

.query-box {
  display: flex;
  justify-content: space-between;
}

/* .el-Input{
  width: 200jpx;
} */
</style>
