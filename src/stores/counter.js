import { defineStore } from 'pinia'
import axios from 'axios'
export const useCounterStore = defineStore('counter', {
  state: () => ({ 
    baseURL: 'http://localhost:3000',
    dataProducts: [],
    dataProductsDetail: {},
    dataCart : [],
    imgUrl: ''
  }),
  actions: {
    async fetchProducts(){
      try {
        const {data} = await axios({
          url: this.baseURL + '/products/',
          method: 'get'
        })
        this.dataProducts = data
      } catch (error) {
        console.log(error)
      }
    },
    async login(email,password){
      try {
        const {data} = await axios({
          url: this.baseURL + '/user/login',
          method: 'post',
          data: {email,password}
        })
        localStorage.setItem('access_token', data.access_token)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    async register(value){
      try {
        const {data} = await axios({
          url: this.baseURL +'/user/register',
          method: 'post',
          data: value
        })
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
    },
    async addProducts(value){
      try {
        const {data} = await axios({
          url: this.baseURL + '/products/',
          method: 'post',
          data: value,
          headers: {access_token: localStorage.getItem('access_token')}
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async editProducts(id){
      try {
        const {data} = await axios({
          url: this.baseURL + '/products/'+id,
          method: 'post',
          data: this.dataProductsDetail,
          headers: {access_token: localStorage.getItem('access_token')}
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async productsDetail(id){
      try {
        const {data} = await axios({
          url: this.baseURL + '/products/' + id,
          method: 'get'
        })
        this.dataProductsDetail = data
      } catch (error) {
        console.log(error)
      }
    },
    async getCart(){
      try {
        const {data} = await axios({
          url: this.baseURL + '/cart/get',
          method: 'get',
          headers: {access_token: localStorage.getItem('access_token')}
        })
        this.dataCart = data
      } catch (error) {
        console.log(error)
      }
    },
    async addCart(id){
      try {
        const {data} = await axios({
          url: this.baseURL + '/cart/add',
          method: 'post',
          data: {ProductId: id},
          headers: {access_token: localStorage.getItem('access_token')}
        })
        console.log(data)
        //this.dataCart = data
      } catch (error) {
        console.log(error)
      }
    },
    async uploadFile(value){
      try {
        const {data} = await axios({
          url: this.baseURL + '/upload/single',
          method: 'post',
          data: {file: value}
        })
        this.imgUrl = data.location
        console.log(this.imgUrl)
      } catch (error) {
        console.log(error)
      }
    },
    async payment(total){
      try {
        const {data} = await axios({
          url: this.baseURL + '/midtrans/',
          method: 'post',
          data: {
            total
          }
        })
        return data.token
      } catch (error) {
        console.log(error)
      }
    }
  },
})
