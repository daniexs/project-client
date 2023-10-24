import { defineStore } from 'pinia'
import axios from 'axios'
export const useCounterStore = defineStore('counter', {
  state: () => ({ 
    baseURL: 'http://localhost:3000',
    dataLeague: []
  }),
  actions: {
    async fetchLeague(){
      const {data} = await axios({
        url: this.baseURL + '/football/' + 'league',
        method: 'get'
      })
      this.dataLeague = data
    }
  },
})
