<script>
import {RouterLink} from 'vue-router'
import {mapState, mapActions} from 'pinia'
import { useCounterStore } from '../stores/counter';
export default {
    props: ['data'],
    methods: {
        ...mapActions(useCounterStore,['addCart']),
        convertCur(value){
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(value)
        }
    },
}
</script>
<template>
    <RouterLink :to="'/detail/' + data.id" class="rounded position-relative fruite-item">
        <div class="fruite-img" >
            <img :src="data.imgUrl[0]" class="img-fluid w-100 rounded-top" alt="">
        </div>
        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">{{ data.category }}</div>
        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
            <h4>{{ data.name }}</h4>
            <p>{{ data.description }}</p>
            <div class="d-flex justify-content-between flex-lg-wrap">
                <p class="text-dark fs-5 fw-bold mb-0"> {{ convertCur(data.price) }}</p>
            </div>
        </div>
    </RouterLink>
</template>