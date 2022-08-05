<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :router="true"
    >
      <el-menu-item index="/">年历</el-menu-item>
      <el-menu-item index="/analysis">分析</el-menu-item>
    </el-menu>

    <router-view />
    <!-- <Calendar></Calendar> -->
  </div>
</template>

<script>
import Calendar from 'v-year-calendar'
export default {
  components: { Calendar },
  data() {
    return {
      activeIndex: '/'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  },
};
</script>

