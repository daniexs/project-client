<script>
import {RouterLink} from 'vue-router'
import {mapActions, mapState, mapWritableState} from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
    data(){
        return {
            count: 0
        }
    },
    methods: {
        ...mapActions(useCounterStore,['getCart']),
        logoutHandler(){
            this.isAuthenticated = false
            localStorage.removeItem('access_token')
            this.dataCart = []
            this.$router.push('/')
        }
    },
    computed:{
        ...mapState(useCounterStore,['dataCart']),
        ...mapWritableState(useCounterStore,['isAuthenticated'])
    },
    created(){
        if(localStorage.access_token){
            this.getCart()
        }
    }
}
</script>
<template>
    <!-- <div id="spinner" class="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
            <div class="spinner-grow text-primary" role="status"></div>
    </div> -->
    <div class="container-fluid fixed-top">
            <div class="container topbar bg-primary d-none d-lg-block">
                <div class="d-flex justify-content-between">
                    <div class="top-info ps-2">
                        <small class="me-3"><i class="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#" class="text-white">123 Street, New York</a></small>
                        <small class="me-3"><i class="fas fa-envelope me-2 text-secondary"></i><a href="#" class="text-white">Email@Example.com</a></small>
                    </div>
                    <div class="top-link pe-2">
                        <a href="#" class="text-white"><small class="text-white mx-2">Privacy Policy</small>/</a>
                        <a href="#" class="text-white"><small class="text-white mx-2">Terms of Use</small>/</a>
                        <a href="#" class="text-white"><small class="text-white ms-2">Sales and Refunds</small></a>
                    </div>
                </div>
            </div>
            <div class="container px-0">
                <nav class="navbar navbar-light bg-white navbar-expand-xl">
                    <a href="index.html" class="navbar-brand"><h1 class="text-primary display-6">Fruitables</h1></a>
                    <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="fa fa-bars text-primary"></span>
                    </button>
                    <div class="collapse navbar-collapse bg-white" id="navbarCollapse">
                        <div class="navbar-nav mx-auto">
                            <RouterLink to="/" class="nav-item nav-link active">Home</RouterLink>
                            <RouterLink to="/shop" class="nav-item nav-link">Shop</RouterLink>
                            
                        </div>
                        <div class="d-flex m-3 me-4">
                            <RouterLink to="/cart" class="position-relative me-4 my-auto">
                                <i class="fa fa-shopping-bag fa-2x"></i>
                                <span class="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style="top: -5px; left: 15px; height: 20px; min-width: 20px;">{{ this.dataCart.length }}</span>
                            </RouterLink>
                            <div class="nav-item dropdown" style="margin-right: 1rem;">
                                <a href="#" class="my-auto">
                                    <i class="fas fa-user fa-2x"></i>
                                </a>
                                <div class="dropdown-menu m-0 bg-secondary rounded-0">
                                    <RouterLink v-if="isAuthenticated == false" to="/login" class="dropdown-item">Login</RouterLink>
                                    <RouterLink to="/add" class="dropdown-item">Add Product</RouterLink>
                                    <a href="" v-if="isAuthenticated == true" v-on:click.prevent="logoutHandler" class="dropdown-item">Logout</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>
            </div>
        </div>
</template>