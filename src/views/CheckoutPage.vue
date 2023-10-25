<script>
import {mapActions, mapState} from 'pinia'
import { useCounterStore } from '../stores/counter';
export default {
    methods: {
        ...mapActions(useCounterStore,['getCart', 'payment']),
        paymentPop(key){
            window.snap.pay(key, {
            onSuccess: function(result){
            /* You may add your own implementation here */
            alert("payment success!"); console.log(result);
            },
            })
        },
        async handlerpayment(){
            const data = await this.payment(this.total)
            console.log(data)
            this.paymentPop(data)
        },
        convertCur(value){
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(value)
        }
    },
    async created(){
        await this.getCart()
        await this.dataCart.map(el=>{
            this.tottalPrice += el.Product.price
        })
        this.total += this.tottalPrice

    },
    computed: {
        ...mapState(useCounterStore,['dataCart'])
    },
    data(){
        return {
            tottalPrice: 0,
            total: 9000
        }
    }
}
</script>
<template>
    <!-- Modal Search Start -->
    <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content rounded-0">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Search by keyword</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex align-items-center">
                        <div class="input-group w-75 mx-auto d-flex">
                            <input type="search" class="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1">
                            <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Search End -->


        <!-- Single Page Header start -->
        <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">Checkout</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Pages</a></li>
                <li class="breadcrumb-item active text-white">Checkout</li>
            </ol>
        </div>
        <!-- Single Page Header End -->


        <!-- Checkout Page Start -->
        <div class="container-fluid py-5">
            <div class="container py-5">
                <h1 class="mb-4">Billing details</h1>
                <form action="#">
                    <div class="row g-5">
                        <div class="col-md-12 col-lg-6 col-xl-7">
                            <div class="row">
                                <div class="col-md-12 col-lg-6">
                                    <div class="form-item w-100">
                                        <label class="form-label my-2">First Name<sup>*</sup></label>
                                        <input type="text" class="form-control mb-2">
                                    </div>
                                </div>
                                <div class="col-md-12 col-lg-6">
                                    <div class="form-item w-100">
                                        <label class="form-label my-2">Last Name<sup>*</sup></label>
                                        <input type="text" class="form-control mb-2">
                                    </div>
                                </div>
                            </div>
                            <div class="form-item">
                                <label class="form-label my-2">Address <sup>*</sup></label>
                                <input type="text" class="form-control mb-2" placeholder="House Number Street Name">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-2">Country<sup>*</sup></label>
                                <input type="text" class="form-control mb-2">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-2">Postcode/Zip<sup>*</sup></label>
                                <input type="text" class="form-control mb-2">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-2">Mobile<sup>*</sup></label>
                                <input type="tel" class="form-control mb-2">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-2">Email Address<sup>*</sup></label>
                                <input type="email" class="form-control mb-2">
                            </div>
                            
                        </div>
                        <div class="col-md-12 col-lg-6 col-xl-5">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Products</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(el, index) in dataCart" :key="el.id">
                                            <th scope="row">
                                                <div class="d-flex align-items-center mt-2">
                                                    <img :src="el.Product.imgUrl" class="img-fluid rounded-circle" style="width: 90px; height: 90px;" alt="">
                                                </div>
                                            </th>
                                            <td class="py-5">{{ el.Product.name }}</td>
                                            <td class="py-5">{{ convertCur(el.Product.price) }}</td>
                                            
                                        </tr>
                                        
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            
                                            <td class="py-5">
                                                <p class="mb-0 text-dark py-3">Subtotal</p>
                                            </td>
                                            <td class="py-5">
                                                <div class="py-3 border-bottom border-top">
                                                    <p class="mb-0 text-dark">{{ convertCur(tottalPrice) }}</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="py-5">
                                                <p class="mb-0 text-dark py-4">Shipping</p>
                                            </td>
                                            <td colspan="3" class="py-5">
                                                <div class="form-check text-start">
                                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Shipping-1" name="Shipping-1" value="Shipping">
                                                    <label class="form-check-label" for="Shipping-1">Free Shipping</label>
                                                </div>
                                                <div class="form-check text-start">
                                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Shipping-2" name="Shipping-1" value="Shipping">
                                                    <label class="form-check-label" for="Shipping-2">Flat rate: Rp 4.000,00</label>
                                                </div>
                                                <div class="form-check text-start">
                                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Shipping-3" name="Shipping-1" value="Shipping">
                                                    <label class="form-check-label" for="Shipping-3">Local Pickup:Rp. 5.000,00</label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td class="py-5">
                                                <p class="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                                            </td>
                                            <td class="py-5">
                                                <div class="py-3 border-bottom border-top">
                                                    <p class="mb-0 text-dark">{{ convertCur(total) }}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div class="col-12">
                                    <div class="form-check text-start my-3">
                                        <input type="checkbox" class="form-check-input bg-primary border-0" id="Transfer-1" name="Transfer" value="Transfer">
                                        <label class="form-check-label" for="Transfer-1">Direct Bank Transfer</label>
                                    </div>
                                    <p class="text-start text-dark">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                </div>
                            </div>
                            
                            <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button v-on:click="handlerpayment" type="button" class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Checkout Page End -->
</template>