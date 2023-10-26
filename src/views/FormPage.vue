<script>
import {mapActions} from 'pinia'
import { useCounterStore } from '../stores/counter'
import FormData from 'form-data'
export default {
    data(){
        return {
            name: '',
            description: '',
            price: '',
            stock: '',
            category: '',

            files: []
        }
    },
    methods: {
        ...mapActions(useCounterStore,['addProducts','uploadFile']),
        async addHandler(){
            const data = {
                name: this.name,
                description: this.description,
                price: this.price,
                stock: this.stock,
                category: this.category
            }
            await this.addProducts(data)
        },
        addFiles(){
            this.$refs.files.click();
        },
        async submitFiles(){
        /*
          Initialize the form data
        */
        let formData = new FormData();
        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('files', file);
        }
        console.log(formData)
        await this.uploadFile(formData)
      },
      handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files;
        /*
          Adds the uploaded file to the files array
        */
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
      },
      removeFile( key ){
        this.files.splice( key, 1 );
      }
    }
    
}
</script>
<template>
    <div style="display: flex;justify-content: center;">
        <form style="display: block;margin-top: 14rem;" v-on:submit.prevent="addHandler">
            <div class="mb-3">
                <div>Name Products</div>
                <input type="text" class="form-control" v-model="name" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <div>Description</div>
                <textarea class="form-control" v-model="description" aria-describedby="emailHelp"></textarea>
            </div>
            <div class="mb-3">
                <div>Price</div>
                <input type="number" class="form-control" v-model="price" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <div>Stock</div>
                <input type="number" class="form-control" v-model="stock" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <div>Category</div>
                <select class="form-select" v-model="category">
                    <option value="" disabled selected>--Select--</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Bread">Bread</option>
                    <option value="Meat">Meat</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="input-group w-100 mb-3">
                <input type="file" class="form-control" multiple aria-describedby="inputGroupFileAddon04" aria-label="Upload" id="files" ref="files" v-on:change="handleFilesUpload()">
                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" v-on:click="submitFiles()">Upload</button>
            </div>
            <div class="large-12 medium-12 small-12 cell mb-3">
                <div v-for="(file, key) in files" class="file-listing">{{ file.name }} <span class="remove-file" v-on:click="removeFile( key )">Remove</span></div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>