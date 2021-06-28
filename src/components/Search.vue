<template>
    <div class="search d-flex align-center">
    <v-btn
        icon
        color="#FF616D"
        style="position: relative; top: -10px; left: -3px"
        
    >
        <v-icon>mdi-cloud-search-outline</v-icon>
    </v-btn>
        <v-text-field
        class="input-search"
        label="Search"
        solo
        flat
        height="60px"
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