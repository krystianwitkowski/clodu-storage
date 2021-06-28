<template>
    <v-icon style="position: absolute; left: 50%; transform: translateX(-50%); font-size: 420px; color: #F5F5F5">{{ icon }}</v-icon>
</template>

<script>
    export default {
        name: 'UploadImage',
        data(){
            return {
                icon: 'mdi-cloud-upload-outline'
            }
        }
    }
</script>
<style>
.btn-upload-image:before {
  opacity: 0 !important;
}

.btn-upload-image .v-ripple__container {
  opacity: 0 !important;
}
</style>
