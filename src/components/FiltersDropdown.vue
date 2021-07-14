<template>
<div>
    <v-menu
      :rounded="rounded"
      offset-y
    >
      <template v-slot:activator="{ attrs, on }">
          <v-btn
            icon
            color="#DCDCDC"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon style="font-size: 21px;">mdi-filter-variant</v-icon>
          </v-btn>
      </template>

      <v-list class="pa-0">
        <v-list-item
          v-for="item in items"
          :key="item"
          link
          @click="handleClick"
          :data-name="item"
        >
          <v-list-item-title v-text="item" style="color: #585858; font-size: 14px;"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
</template>

<script>
export default {
  name: 'FiltersDropdown.vue',
  data(){
    return {
      items: ['newset', 'oldest'],
    }
  },
  methods: {
    handleClick(e){
      const filterName = e.currentTarget.getAttribute('data-name');
      this.$store.commit('filterFiles', filterName)
    }
  }
}
</script>

<style>
.v-menu__content {
    box-shadow: none !important;
    border: 1px solid rgba(0,0,0,0.1);
    margin-top: 10px;
}
</style>

