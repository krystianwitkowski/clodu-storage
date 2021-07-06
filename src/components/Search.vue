<template>
    <div class="mt-10 search d-flex align-center">
        <v-text-field
        class="input-search"
        label="Search"
        solo
        flat
        height="45px"
        v-model="search"
        ></v-text-field>
    </div>
</template>

<script>
export default {
    name: 'Search',
    computed: {
        search: {
            get(){
                return this.$store.state.search;
            },
            set(value){
                return this.$store.commit('updateSearch', value)
            }
        }
    }
}
</script>

<style>

.input-search .v-input__control .v-input__slot {
    background: #F8F8F8 !important;
    border-radius: 50px;
    padding: 0 25px !important;
}

.input-search .v-input__control .v-input__slot .v-text-field__slot .v-label {
    color: #BEBEBE;
}


</style>