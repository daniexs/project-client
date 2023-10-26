<script>
import {RouterLink} from 'vue-router'
import {mapActions} from 'pinia'
import { useCounterStore } from '../stores/counter';
export default {
    data(){
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(useCounterStore,['register']),
        async registerHadler(){
            const data = {username: this.username, email: this.email, password: this.password}
            await this.register(data)
        }
    }
}
</script>
<template>
    <div class="main">

<!-- Sign up form -->
<section class="signup">
    <div class="container">
        <div class="signup-content">
            <div class="signup-form">
                <h2 class="form-title">Sign up</h2>
                <form method="POST" class="register-form" id="register-form" v-on:submit.prevent="registerHadler">
                    <div class="form-group">
                        <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                        <input type="text" v-model="username" name="name" id="name" placeholder="Your Name"/>
                    </div>
                    <div class="form-group">
                        <label for="email"><i class="zmdi zmdi-email"></i></label>
                        <input type="email" v-model="email" name="email" id="email" placeholder="Your Email"/>
                    </div>
                    <div class="form-group">
                        <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                        <input type="password" v-model="password" name="pass" id="pass" placeholder="Password"/>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                        <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                    </div>
                    <div class="form-group form-button">
                        <input type="submit" name="signup" id="signup" class="form-submit" value="Register"/>
                    </div>
                </form>
            </div>
            <div class="signup-image">
                <figure><img src="images/signup-image.jpg" alt="sing up image"></figure>
                <RouterLink to="/login" class="signup-image-link">I am already member</RouterLink>
            </div>
        </div>
    </div>
</section>
        
    </div>
</template>