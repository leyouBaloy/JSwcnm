import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
// import { all } from 'core-js/fn/promise';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataUrl:"",
    allData: []
  },
  getters: {
  },
  mutations: {
    setDataUrl(state, dataUrl) {
      state.dataUrl = dataUrl
    },
    setAllData(state, allData) {
      state.allData = allData
    }
  },
  actions: {
    getAllData(context) {
      return new Promise((resolve, reject) => {
        console.log("context".context)
      axios
        .get(
          `api/${context.state.dataUrl.split("/").splice(-1)}`
        )
        .then((res) => {
          let allData = res.data
          allData.sort((a,b)=>{ return a.time-b.time}) // 排序
          console.log("store/index.js中的allData", allData)
          context.commit('setAllData', allData) // 赋值state.allData
          resolve(allData)
        })
        .catch(function (error) {
          reject(error)
          console.log(error);
        });
      })
      
    }
  },
  modules: {
  }
})
