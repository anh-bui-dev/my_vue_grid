<template>
    <div v-if="openPopup" class="modal modal-mask">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header div-responsive">
                    <div class="modal-title"><h4>Message Box</h4></div>
                    <button type="button" class="close" @click="handlePopup" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body div-responsive">
                    <Success :message="message" />
                    <Booking :detail="detail" />
                </div>
                <div class="modal-footer div-responsive">
                    <button type="button" class="btn btn-secondary" @click="handlePopup">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Success from './Success'
import Booking from './Booking'

export default {
    name: 'Popup',
    props: ['message', 'detail'],
    components: {
        Success,
        Booking
    },
    data() {
        return {
            openPopup: false
        }
    },
    methods: {
        handlePopup() {
            this.openPopup = !this.openPopup;
        }
    }
}
</script>