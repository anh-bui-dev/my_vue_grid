<template>
    <div class="alert alert-success alert-dismissible fade show">
        <strong>Success: </strong> {{ message }}.
    </div>
</template>

<script>
export default {
    name: 'Success',
    props: ['message']
}
</script>