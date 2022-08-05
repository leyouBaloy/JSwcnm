<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :router="true"
    >
      <el-menu-item index="/">录入信息</el-menu-item>
      <el-menu-item index="/yearcalendar">年历</el-menu-item>
      <el-menu-item index="/analysis">分析</el-menu-item>
    </el-menu>

    <router-view />
  </div>
</template>

<script>
import Calendar from "v-year-calendar";
export default {
  components: { Calendar },
  data() {
    return {
      activeIndex: this.$route.path,
    };
  },
  methods: {
    checkLogin() {
      if(!this.$store.state.dataUrl || !this.$store.state.allData[0]){
      this.$alert('请于“录入信息”页面输入url并点击“录入”', '没有录入url或url错误', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
    }
    },
    // 切换路径
    handleSelect(key, keyPath) {
      if( keyPath!='/' ){
        this.checkLogin()
      }
      console.log(key, keyPath);
    }
  },
  created() {
    // 设置cookies 30天后过期
    this.$cookies.config('30d')
    // window object
    window.$cookies.config('30d')
    // 如果有cookie就设置上
    if(this.$cookies.get('dataUrl')){
      console.log("有cookie",this.$cookies.get('dataUrl'))
      this.$store.commit('setDataUrl', this.$cookies.get('dataUrl'))
    }

    // this.checkLogin();
  },
};
</script>

