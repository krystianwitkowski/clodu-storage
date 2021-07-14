<template>
  <v-data-table
    hide-default-footer	
    :headers="headers"
    :items="items"
    item-key="name"
    class="elevation-0"
    style="max-width: 750px; width: 100%; margin-top: 70px;"
  ></v-data-table>
</template>

<script>
import convertBytes from '../utilities/convertBytes.js';

export default {
    name: 'GridFiles',
    props: {
      files: {
        type: Array,
        required: true
      }
    },
    data(){
    return {
      items: [],
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Extension',
          value: 'extension',
        },
        {
          text: 'Owner',
          value: 'owner'
        },
        {
          text: 'File size',
          value: 'filesize'
        }
      ],
        }
    },
    created(){
      const files = this.$props.files.map(obj => ({ name: this.getName(obj.file.name), extension: this.getExtension(obj.file.name), owner: 'me', filesize: convertBytes(obj.file.size)}))
      this.items = files;
    },
    methods: {
      getExtension(str){
        const index = str.indexOf('.')
        
        return str.slice(index, str.length);
      },
      getName(str){
        const index = str.indexOf('.')

        return str.slice(0, index);
      }
    }
}
</script>
<style>
.sortable span{
  font-size: 13px;
}
</style>