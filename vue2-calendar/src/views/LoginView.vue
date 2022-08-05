<template>
  <div class="container">
    <h2>请输入url</h2>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button class="jixu" @click="jixu()" :loading="loading">录入</el-button>
    <el-divider></el-divider>
    <el-avatar class="avatar" size="large" :src="circleUrl"></el-avatar><br />
    <p>{{ userName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: this.$store.state.dataUrl ? this.$store.state.dataUrl : "",
      loading: false,
      userName: this.$store.state.allData[0]
        ? this.$store.state.allData[0].mine_info[0].name
        : "未录入",
      circleUrl: this.$store.state.allData[0]
        ? this.$store.state.allData[0].mine_info[0].avatar
        : "",
    };
  },
  methods: {
    // 检查url是否合法
    checkUrl(url) {
      const re =
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      return re.test(url);
    },
    jixu() {
      this.loading = true;
      if (this.checkUrl(this.input)) {
        // 如果合法，设置store，设置cookie，发送请求
        this.$store.commit("setDataUrl", this.input);
        this.$cookies.set("dataUrl", this.input)
        this.$store.dispatch("getAllData").then((res) => {
          console.log("jixu里的res", res);
          this.$message({
            type: "success",
            message: "录入成功 ",
          });
          this.userName = this.$store.state.allData[0].mine_info[0].name;
          this.circleUrl = this.$store.state.allData[0].mine_info[0].avatar;
          this.loading = false;
        })
        .catch(err=>{
            this.$message({
            type: "info",
            message: "录入失败 ",
          });
          this.loading = false
        })
      } else {
        this.$message({
            type: "info",
            message: "url不合法 ",
          });
        this.loading = false
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  width: 80%;
  margin: auto;
}
.jixu {
  margin-top: 30px;
}
</style>