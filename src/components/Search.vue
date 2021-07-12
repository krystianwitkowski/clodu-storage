<template>
    <div class="mt-8 search d-flex align-center">
        <v-text-field
        class="input-search"
        label="Search"
        solo
        flat
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
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 50px;
    padding: 0 23px !important;
    max-width: 550px;
}

.input-search .v-input__control {
    min-height: 45px !important;
}

.input-search .v-input__control .v-input__slot .v-text-field__slot .v-label {
    color: #BEBEBE;
}

.input-search .v-input__control .v-input__slot .v-text-field__slot input {
    color: #BEBEBE;
}



</style>