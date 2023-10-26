import { defineStore } from 'pinia'
import axios from 'axios'
export const useCounterStore = defineStore('counter', {
  state: () => ({ 
    baseURL: 'http://localhost:3000',
    dataProducts: [],
    dataProductsDetail: {},
    dataCart : [],
    imgUrl: '',
    isAuthenticated: localStorage.access_token ? true : false
  }),
  actions: {
    async fetchProducts(page,filter,name){
      let url = this.baseURL + '/products'
      url += ('?page=' + page)
      if(filter !== 'all'){
        url += ('&filter='+ filter)
      }
      if(name){
        url += ('&name='+ name)
      }
      try {
        const {data} = await axios({
          url,
          method: 'get'
        })
        const dataFetch = data.map(el=>{
          el.imgUrl = el.imgUrl.split(',')
          console.log(el.imgUrl)
          return el
        })
        this.dataProducts = dataFetch
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
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
        this.isAuthenticated = true
        this.$router.push('/')
        await this.getCart()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
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
        Swal.fire({
          title: `${data.email} done create, you can log in`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async addProducts(value){
      try {
        value.imgUrl = this.imgUrl
        const {data} = await axios({
          url: this.baseURL + '/products/add',
          method: 'post',
          data: value,
          headers: {access_token: localStorage.getItem('access_token')}
        })
        this.$router.push('/shop')
        this.imgUrl = ''
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async productsDetail(id){
      try {
        let {data} = await axios({
          url: this.baseURL + '/products/' + id,
          method: 'get'
        })
        this.dataProductsDetail = data
        data.imgUrl = data.imgUrl.split(',')
        this.dataProductsDetail = data
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
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
        await this.getCart()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Add Wihslist in successfully'
        })
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async uploadFile(formData){
      try {
        const {data} = await axios({
          url: this.baseURL + '/upload/upload-multiple',
          method: 'post',
          data: formData,
          headers: {'Content-Type': 'multipart/from-data',access_token: localStorage.getItem('access_token')}
        })
        
        const img = data.map(el=>{
          return el.location
        }).join(',')
        console.log(img)
        this.imgUrl = img
        // console.log(this.imgUrl)
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async payment(total){
      try {
        const {data} = await axios({
          url: this.baseURL + '/midtrans/',
          method: 'post',
          data: {
            total
          },
          headers: {access_token: localStorage.getItem('access_token')}
        })
        return data.token
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async delCart(id){
      try {
        const {data} = await axios({
          url: this.baseURL + '/cart/'+id,
          method: 'delete',
          headers: {access_token: localStorage.getItem('access_token')}
        })
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Delete in successfully'
        })
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    }
  },
})
