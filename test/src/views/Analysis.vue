<template>
  <div class="container">
    <div class="row">
      <span class="text">共有</span><span class="number">123</span
      ><span class="text">篇日志</span>
    </div>
    <div id="myChart1" :style="{width: '600px',height: '400px', margin: 'auto'}"></div>
     <el-divider></el-divider>
    <h2>日志完成率</h2>
    <div id="myChart2" :style="{width: '600px',height: '600px', margin: 'auto'}"></div>
     <el-divider></el-divider>
    <div class="row">
      <span class="text">您的日志指数为</span><span class="number">82</span><br>
    </div>
    <span class="xie">日志指数的计算方式为：（写日志天数/总天数）* 0.8 + （平均字数/100）* 0.2 </span>
     <el-divider></el-divider>
  </div>
</template>

<script>
import { auto } from "@popperjs/core";

export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于刚刚准备好的 DOM 容器，初始化 EChart 实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart2.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "完成天数" },
              { value: 735, name: "未完成天数" },
            ],
          },
        ],
      });
      myChart1.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: [10, 20, 21, 23, 10, 15, 30],
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
.row {
  margin-top: 20px;
  margin-left: 20px;
}

.text {
  font-size: 26px;
  vertical-align: middle;
}

.number {
  font-size: 40px;

  vertical-align: middle;
}
.xie {
    font-style: italic;
    font-weight: lighter;
}
</style>