<script>
import {RouterLink} from 'vue-router'
export default {
    props: ['data']
}
</script>
<template>
    <RouterLink :to="'/detail/'+ data.id " class="rounded position-relative fruite-item">
        <div class="fruite-img">
            <img :src="data.imgUrl" class="img-fluid w-100 rounded-top" alt="">
        </div>
        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">Fruits</div>
        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
            <h4>{{ data.name }}</h4>
            <p>{{ data.description }}</p>
            <div class="d-flex justify-content-between flex-lg-wrap">
                <p class="text-dark fs-5 fw-bold mb-0">$ {{ data.price }}</p>
                <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
            </div>
        </div>
    </RouterLink>
</template>