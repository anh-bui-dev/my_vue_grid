<template>
    <div class="container">
        <div class="search">
            <input @keyup.enter="handleEnter" class="form-control" @change="handleChange" type="text" placeHolder="Search for booking by product name" />
            <br/>
            <div class="content" v-for="seller in sellers" :key="seller">
                <p>{{ seller.name }}</p>
                <Bookings :seller="seller" />
            </div>
            <Loading ref="loading" />
            <Error v-if="error && error.message" :message="error.message" />
        </div>
    </div>
</template>

<script>
import Bookings from './Bookings'
import Loading from './Loading'
import Error from './Error'
import { URL } from '../constants/constants'
import axios from 'axios'

export default {
    name: 'Search',
    components: {
        Bookings,
        Loading,
        Error
    },
    data() {
        return {
            keyWord: "",
            sellers: [],
            error: null
        }
    },
    mounted() {
        this.getSellers();
    },
    methods: {
        handleChange(e) {
            e.preventDefault();
            this.keyWord = e.target.value;
            if(this.keyWord.length >=3 ) {
                this.getSellers();
            }
        },

        handleEnter(e) {
            e.preventDefault();
            this.getSellers();
        },

        getSellers() {
            // Show loading
            this.$refs.loading.handleLoading();
            Promise.all([
                axios.get(URL + "/sellers"),
                axios.get(URL + "/products")
            ])
            .then(([resp, resp1]) => {
                const sellers = resp.data.map(seller => {
                    var products = resp1.data.filter(x => (x.sellerId == seller.id) && (x.name.toUpperCase().includes(this.keyWord.toUpperCase())));
                    return {...seller, products: products};
                })
                this.sellers = sellers;
                // Hide loading
                this.$refs.loading.handleLoading();
            })
            .catch((err) => {
                // Handle the error
                this.error = err;
                // Hide loading
                this.$refs.loading.handleLoading();
            });
        }
    }
}
</script>