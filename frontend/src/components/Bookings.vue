<template>
    <transation>
        <ag-grid-vue class="grid ag-theme-blue"
                    @grid-ready = "onGridReady"
                    :columnDefs = "columnDefs"
                    :rowData = "rowData"
                    :enableSorting = "true"
                    :enableFilter = "true"
                    :paginationAutoPageSize = "true"
                    :pagination = "true"
                    :rowSelection = "rowSelection"
                    :enableColResize = "true"
                    :overlayNoRowsTemplate = "overlayNoRowsTemplate"
                    @row-double-clicked = "handlePopup"
                 >
        </ag-grid-vue>
        <Popup ref="popup" message="Show the detail of booking" :detail="detail" />
        <Error v-if="error && error.message" :message="error.message" />
    </transation>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { AgGridVue } from "ag-grid-vue"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-blue.css"
import { URL } from '../constants/constants'
import Popup from './Popup'
import Error from './Error'
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'Bookings',
    props: ['seller'],
    components: {
        AgGridVue,
        Popup,
        Error
    },
    data() {
        return {
            columnDefs: [
                {   headerName: 'ID', field: 'id', cellClass: "grid-id", width: 84, cellRenderer: (data) => {
                        return data.value.substring(0, 5).toUpperCase();  
                }},
                {   headerName: 'Product Name', field: 'productName', width: 300 },
                {   headerName: 'Quantity', field: 'quantity', cellClass: "grid-number", width: 100, cellRenderer: (data) => {
                        return new Intl.NumberFormat().format(data.value);
                }},
                {   headerName: 'Rate', field: 'rate', cellClass: "grid-number", width: 84, cellRenderer: (data) => {
                        return '$ ' + new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(data.value / 100);
                }},
                {   headerName: 'Cost', field: 'cost', cellClass: "grid-number", width: 100, cellRenderer: (data) => {
                        return '$ '+ new Intl.NumberFormat().format(Math.round(data.value));
                }}
            ],
            rowData: null,
            rowSelection: null,
            overlayNoRowsTemplate: null,
            error: null,
            detail: null
        }
    },
    beforeMount() {
        axios.get(URL + "/bookings")
        .then(resp => {
            const products = this.$props.seller.products;
            const bookings = [];
            products.map(product => {
                const data = resp.data.filter(x => x.productId == product.id);
                data.map(item => {
                    // Check end date is after today
                    if(moment(item.endDate).isAfter()) {
                        const booking = {...item, ...{ productName: product.name, rate: product.rate }};
                        booking.cost = (product.rate / 1000) * booking.quantity;
                        bookings.push(booking);
                    }
                });
            })
            // Sort by start date
            bookings.sort((a, b) => a.startDate.localeCompare(b.startDate));
            this.rowData = bookings;
        })
        .catch((err) => {
            // Handle the error
            this.error = err;
            // Hide loading
            this.$refs.loading.handleLoading();
        });

        this.rowSelection = "single";
        this.overlayNoRowsTemplate = "No Active Bookings";
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;

            this.gridApi.sizeColumnsToFit();
            this.gridColumnApi.autoSizeColumns();
            
            window.addEventListener("resize", () => {
                setTimeout(() => {
                    this.gridApi.sizeColumnsToFit();
                    this.gridColumnApi.autoSizeColumns();
                });
            });
        },

        handlePopup(row) {
            this.detail = row && row.data ? row.data : null;
            this.$refs.popup.handlePopup();
        }
    }
}
</script>