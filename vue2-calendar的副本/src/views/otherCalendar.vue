<template>
  <div>
    <NavMenu></NavMenu>
<YearCalendar
    :activeDates.sync="activeDates"
    prefixClass="your_customized_wrapper_class"
    :activeClass="'info'"
    :showYearSelector="false"
    ></YearCalendar>
   
  </div>
</template>

<script>
function timestampToTime(timestamp) {
    timestamp = timestamp ? timestamp : null;
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }

import axios from "axios";
import YearCalendar from "../components/YearCalendar.vue";
import NavMenu from "../components/NavMenu.vue"

export default {
  components: {
    YearCalendar,
    NavMenu

},
  data() {
    return {
      logsData: [],
      activeDates:[],
    };
  },
  methods: {

  },
  mounted() {
    axios
      .get(
        "https://656e-env-8gi24uylfeb71c40-1307751968.tcb.qcloud.la/oJGw25T8zUCr9Or8QraZtCYS4wow.json"
      )
      .then((response) => {
        this.logsData = response.data;
        
          this.activeDates = response.data.map( (x)=> {return {date: timestampToTime(x.time)}} )
          console.log(this.activeDates)
      })
      .catch(function (error) {
        // 请求失败处理
        console.log(error);
      });
  },
};
</script>


<style lang="stylus">
.your_customized_wrapper_class
  background-color: #0aa
  color: white
  &.red
    background-color: red
    color: white
    &:after
      background-image url('./assets/baseline-remove_circle-24px.svg')
      background-size 100% 100%
  &.blue
    background-color: #0000aa
    color: white
  &.your_customized_classname
    background-color: yellow
    color: black

</style>
