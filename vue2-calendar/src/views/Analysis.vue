<template>
  <div class="container">
    <div class="row">
      <span class="text">共有</span
      ><span class="number">{{ this.$store.state.allData.length }}</span
      ><span class="text">篇日志</span>
    </div>
    <div
      id="myChart1"
      :style="{ width: '700px', height: '400px', margin: 'auto' }"
    ></div>
    <el-divider></el-divider>
    <h2>日志完成率</h2>
    <div
      id="myChart2"
      :style="{ width: '600px', height: '600px', margin: 'auto' }"
    ></div>
    <el-divider></el-divider>
    <div class="row">
      <span class="text">您的日志指数为</span><span class="number">{{ logsIndex }}</span
      ><br />
    </div>
    <span class="xie"
      >日志指数的计算方式为：(写日志天数/总天数)* 0.8 + (平均字数/50)* 0.2
    </span>
    <el-divider></el-divider>
  </div>
</template>

<script>

const dayjs = require("dayjs"); // dayjs

export default {
  data() {
    return {
      allData: this.$store.state.allData
    };
  },
  mounted() {
    this.countByMonth();
    this.drawLine();
  },
  methods: {
    countByMonth() {
      var res = {} // 字典
      let allData = this.$store.state.allData
      for(let i=0; i<allData.length; i++ ){
        if(res[dayjs(allData[i].time).format('YYYY-MM')]){
        res[dayjs(allData[i].time).format('YYYY-MM')] += 1
      } else {
        res[dayjs(allData[i].time).format('YYYY-MM')] = 1
      }
    }
    return res
    },
    drawLine() {
      // 基于刚刚准备好的 DOM 容器，初始化 EChart 实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      var countByMonth = this.countByMonth()
      console.log("countByMonth", countByMonth, typeof countByMonth)
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
              { value: dayjs(this.allData.slice(-1).time).diff(dayjs(this.allData[0].time),'day')-this.allData.length, name: "未完成天数" },
              { value: this.allData.length, name: "完成天数" },
            ],
          },
        ],
      });
      myChart1.setOption({
        xAxis: {
          type: "category",
          data: Object.keys(countByMonth),
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
      trigger: 'axis'
    },
        series: [
          {
            data: Object.values(countByMonth),
            type: "line",
            smooth: true,
          },
        ],
      });
    },
  },
  computed: {
    logsIndex() {
        var str_num = 0
        for(let i=0;i<this.allData.length;i++){
          str_num += this.allData[i].content.length
          for(let j=0;j<this.allData[i].comment;j++){
            str_num += this.allData[i].comment[j].content.length
          }
        }
        return ((this.allData.length / dayjs(this.allData.slice(-1).time).diff(dayjs(this.allData[0].time),'day')) * 0.8 + (str_num / 50)*0.2).toFixed(2)
      }
      
  }
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