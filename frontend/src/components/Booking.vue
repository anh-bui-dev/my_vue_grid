<template>
    <div class="table-responsive div-responsive">
        <table class="table table-borderless">
            <tbody>
                <tr>
                    <td class='label' colSpan="1">Product:</td>
                    <td colSpan="10">{{detail.productName}}</td>
                    <td colSpan="1">&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <tr>
                    <td class='label' colSpan="1">ID:</td>
                    <td class='label' colSpan="4">{{detail.id.substring(0, 5).toUpperCase()}}</td>
                    <td colSpan="1">&nbsp;&nbsp;&nbsp;</td>
                    <td class='label' colSpan="1">Quantity:</td>
                    <td colSpan="4">{{new Intl.NumberFormat().format(detail.quantity)}}</td>
                    <td colSpan="1">&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <tr>
                    <td class='label' colSpan="1">Rate:</td>
                    <td colSpan="4">{{'$ ' + new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(detail.rate / 100)}}</td>
                    <td colSpan="1">&nbsp;&nbsp;&nbsp;</td>
                    <td class='label' colSpan={1}>Cost:</td>
                    <td colSpan="4">{{'$ '+ new Intl.NumberFormat().format(Math.round(detail.cost))}}</td>
                    <td colSpan="1">&nbsp;&nbsp;&nbsp;</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Booking',
    props: ['detail']
}
</script>