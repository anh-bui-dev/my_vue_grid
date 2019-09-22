<template>
    <div v-if="loading" class="modal-mask">
        <div class="loading d-flex justify-content-center">
            <div class="spinner-grow text-info" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    data() {
        return {
            loading: false
        }
    },
    methods: {
        handleLoading() {
            this.loading = !this.loading;
        }
    }
}
</script>
