<template>
    <div class="alert alert-danger alert-dismissible fade show">
        <strong>Error: </strong> {{ message }}.
    </div>
</template>

<script>
export default {
    name: 'Error',
    props: ['message'],
}
</script>
