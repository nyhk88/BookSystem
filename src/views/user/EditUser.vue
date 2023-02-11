<template>
  <div style="width: 80%">
    <div style="margin-bottom: 30px">编辑用户</div>
    <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="卡号">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.sex" label="男">男</el-radio>
        <el-radio v-model="form.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" placeholder="请输入地址"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center; margin-top: 30px">
      <el-button type="primary" @click="save" size="medium">提交</el-button>
    </div>

  </div>
</template>
<script>
import request from "@/utils/request";

export default {
  name: 'EditUser',
  /*表格数据*/
  data() {
    /*校验年龄的自定义规则*/
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      if (!/^[0-9]+$/.test(value)) {
        callback(new Error('请输入数字值'));
      }
      if(parseInt(value) > 120 || parseInt(value) <= 0){
        callback(new Error('请输入合理的年龄'));
      }
      callback()
    };
    /*校验手机的自定义规则*/
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      if (/^((13[0-9])|(14[0,1,4-9])|(15[0-3,5-9])|(16[2,5,6,7])|(17[0-8])|(18[0-9])|(19[0-3,5-9]))\\d{8}$/.test(value)) {
        callback(new Error('请输入合理的手机号'));
      }
      callback()
    };
    return {
      form: {},
      rules: {/*表单校验规则*/
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        age: [
          {validator: checkAge, trigger: 'blur'}
        ],
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    /*通过后台id查出的对象赋值给form表单*/
    const id = this.$route.query.id
    request.get("/user/" + id).then(res => {
      this.form = res.data
    })
  },
  methods: {
    save() {
      this.$refs['ruleForm'].validate((valid) =>{ /*提交时校验*/
        if(valid) {
          request.put('/user/update', this.form).then(res => {
            if (res.code === '200') {
              this.$notify.success("修改成功")
              this.$router.push("/user") /*回到用户界面*/
            } else {
              this.$notify.error(res.msg)
            }
          })
        }
      })
    }
  }
}

</script>