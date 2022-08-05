<template>
  <div>
    <div id="events-log">
      <h3>Events</h3>
      <div v-for="(event, index) in events" :key="index">{{ event }}<hr></div>
    </div>
    <Calendar
      id="calendar"
      :year="currentYear"
      :min-date="minDate"
      :max-date="maxDate"
      :data-source="dataSource"
      @mouse-on-day="mouseOnDay"
      @mouse-out-day="mouseOutDay"
      @click-day="clickDay"
      @day-context-menu="dayContextMenu"
      @select-range="selectRange"
      @render-end="renderEnd"
      @year-changed="yearChanged"
    ></Calendar>
  </div>
</template>

<script>
import Calendar from "v-year-calendar";
import tippy from "../utils/index.all.min.js";
import { mapState } from "vuex";

// import testLogs from ""

export default {
  name: "YearCalendar",
  components: {
    Calendar,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      events: [],
      tooltip: null,
    };
  },
  methods: {
    mouseOnDay: function (e) {
      if (e.events.length > 0) {
        var content = "";

        for (var i in e.events) {
          content +=
            '<div class="event-tooltip-content">' +
            '<div class="event-name" style="color:' +
            e.events[i].color +
            '">' +
            e.events[i].name +
            "</div>" +
            '<div class="event-details">' +
            e.events[i].details +
            "</div>" +
            "</div>";
        }

        if (this.tooltip != null) {
          this.tooltip.destroy();
          this.tooltip = null;
        }

        this.tooltip = tippy(e.element, {
          placement: "right",
          content: content,
          animateFill: false,
          animation: "shift-away",
          arrow: true,
        });
        this.tooltip.show();
      }
    },
    mouseOutDay: function () {
      if (this.tooltip !== null) {
        this.tooltip.destroy();
        this.tooltip = null;
      }
    },
    clickDay: function (e) {
      for (let i = 0; i < e.events.length; i++) {
        this.events.push(
          ` ${e.date.toLocaleDateString()} ${e.events[i].details} `
        );
      }
    },
    dayContextMenu: function (e) {
      this.events.push(
        `Right-click on day: ${e.date.toLocaleDateString()} (${
          e.events.length
        } events)`
      );
    },
    selectRange: function (e) {
      this.events.push(
        `Select a range: ${e.startDate.toLocaleDateString()} - ${e.endDate.toLocaleDateString()}`
      );
    },
    dayContextMenu: function (e) {
      this.events.push(
        `Click on day: ${e.date.toLocaleDateString()} (${
          e.events.length
        } events)`
      );
    },
    renderEnd: function (e) {
      this.events.push(`Render end: ${e.currentYear}`);
    },
    yearChanged: function (e) {
      this.events.push(`Year changed: ${e.currentYear}`);
    },
  },
  computed: {
    getComment() {},
    ...mapState(['allData']), // 从store里获取allData
    dataSource() {
      return this.allData.map(x => {
        let comment = ""
        for( let i=0; i < x.comment.length; i++ ){
          comment += `${x.comment[i].name}:${x.comment[i].content}`
        }
        return{
          startDate: new Date(x.time),
          endDate: new Date(x.time),
          name: x.is_public ? "公开":"私有",
          details: comment ? `【内容】:${x.content}<br>【评论】:${comment}` : `${x.content}`,
    }});
    this.console("dataSource",this.dataSource)
    },
    minDate() {
      // console.log("mindate", new Date(this.allData[0].time));
      return new Date(this.allData[0].time);
    },
    maxDate() {
      return new Date(this.allData[this.allData.length - 1].time);
    },
  },
  created() {
    
  },
  mounted() {

  },
};
</script>

<style scoped>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

#events-log {
  display: inline-block;
  vertical-align: top;
  width: 340px;
  background-color: #e5e5e5;
  padding: 10px;
  min-height: 200px;
  border-radius: 10px;
}

#events-log div {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.4;
}

#calendar {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 380px);
}
</style>