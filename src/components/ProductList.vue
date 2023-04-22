<template>
    <div>
        <div v-if="state.product">
            <button class="bg-red-500 hover:bg-red  -700 text-white font-bold py-2 px-4 rounded"
                @click="state.product = null">Back</button>
            <div class="py-6 max-w-md">
                <div class="flex flex-col bg-white border shadow-lg rounded-lg overflow-hidden p-3">
                    <div>
                        <div class="flex max-w-md">
                            <div class="w-1/3 bg-cover"
                                v-bind:style="{ backgroundImage: 'url(' + state.product.imageURL + ')' }">
                            </div>
                            <div class="w-2/3 p-4">
                                <h1 class="text-gray-900 font-bold text-2xl">{{state.product.name}}</h1>
                                <p class="mt-2 text-gray-600 text-sm">Price: {{state.product.price.value}}</p>
                                <div>
                                    <Star :rating="state.product.rating" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="mt-2 p-2 text-gray-600 text-sm">{{state.product.description}}</p>
                    </div>
                    <div>
                        <button v-if="!state.remembered"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                            @click="addToWatchList(state.product)">
                            Remember
                        </button>

                        <button v-if="state.remembered"
                            class="bg-red-500 hover:bg-red  -700 text-white font-bold py-2 px-4 rounded w-full"
                            @click="removeToWatchList(state.product)">
                            Forget
                        </button>
                    </div>
                    <div>
                        <p class="mt-2 text-gray-600 text-sm p-2">{{state.product.longDescription}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!state.product">
            <label for="countries" class="block mb-2 text-sm font-medium">Select an
                option</label>
            <select id="countries" v-model="state.selectedFilter"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                @change=showProduct()>
                <option value="all">All Product</option>
                <option value="available">Available</option>
                <option value="watchlist">WatchList</option>
            </select>
            <div v-for="product in state.products">
                <!-- {{ product.name }} -->
                <div class="py-6">
                    <div class="flex max-w-md bg-white border shadow-lg rounded-lg overflow-hidden p-3 cursor-pointer"
                        @click="productDetail(product)">
                        <div class="w-1/3 bg-cover" v-bind:style="{ backgroundImage: 'url(' + product.imageURL + ')' }"
                            v-if="product.available">
                        </div>
                        <div class="w-2/3 p-4">
                            <h1 class="text-gray-900 font-bold text-2xl">{{product.name}}</h1>
                            <p class="mt-2 text-gray-600 text-sm">{{product.description}}</p>


                            <div class="flex item-center justify-between mt-3">
                                <h1 class="text-gray-700 font-bold text-xl" v-if="product.available">
                                    ${{product.price.value}}</h1>
                                <div>
                                    <Star :rating="product.rating" />
                                </div>
                            </div>
                        </div>
                        <div class="w-1/3 bg-cover" v-bind:style="{ backgroundImage: 'url(' + product.imageURL + ')' }"
                            v-if="!product.available">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

    import { reactive } from "vue";
    import axios from 'axios'
    import Star from './Star.vue'
    // defineProps < {
    //     msg: string,
    // } > ()
    //state.product = product

    function addToWatchList(product) {
        state.watchList.push(product);
        localStorage.setItem('watchList', JSON.stringify(state.watchList))
        checkWatchList(product);
    }

    function removeToWatchList(product) {
        state.watchList = state.watchList.filter(item => item.id != product.id);
        localStorage.setItem('watchList', JSON.stringify(state.watchList))
        checkWatchList(product);
    }

    function showProduct() {
        console.log(state.selectedFilter);
        if (state.selectedFilter == 'all') {
            state.products = state.allProduct;
        } else if (state.selectedFilter == 'available') {
            state.products = state.allProduct.filter(item => item.available)
        } else {
            state.products = state.watchList
        }
    }
    function checkWatchList(product) {
        const products = state.watchList.filter(item => item.id == product.id)
        if (products.length > 0) {
            state.remembered = true;
        } else {
            state.remembered = false;
        }
    }

    function productDetail(product) {
        state.product = product;
        checkWatchList(product);
    }

    function getProductLists() {
        axios.get("https://gist.githubusercontent.com/benfranke/c33280a8df5f4f9db2e63ad45cab26a4/raw/f3ad6c00ff520c2667305103d5705bcbb57a7778/products.json").then((response) => {
            console.log(response.data);
            //this.todos = response.data.data;
            state.products = response.data.products
            state.allProduct = response.data.products
        });
    }
    const state = reactive({
        products: [],
        allProduct: [],
        product: null,
        watchList: [],
        remembered: false,
        selectedFilter: 'all'
    });
    muted();

    function muted() {
        getProductLists();
        getRemembered();
    }

    function getRemembered() {
        state.watchList = localStorage.getItem('watchList') ? JSON.parse(localStorage.getItem('watchList')) : [];
        console.log('watchlist', state.watchList);
    }
</script>