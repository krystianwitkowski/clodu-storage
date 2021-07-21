<template>
<v-col @mousedown.left="handleMouseDownLeft" @contextmenu.prevent="handleContextMenu" :data-id="fileId" style="width: 260px; height: 180px; flex-basis: initial; flex-grow: initial; max-width: initial;">
    <a :href="`data:${file.icons.mimetype};base64,${file.base64}`" :download="file.file.name" style="text-decoration: none; display: block; height: 100%;border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 8px;">
    <v-list-item-group style="height: 100%;">
        <v-list-item 
        style="
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            height: 100%;
        "
        >
        <v-list-item-icon class="ma-0" style="align-self: center;">
            <v-icon color="#fd5e53" style="font-size: 28px"
            >{{ file.icons.icon }}</v-icon
            >
        </v-list-item-icon>
        <v-list-item-content style="flex: initial;">
            <v-list-item-title style="color: #585858" class="subtitle-2"
            >{{ file.file.name }}</v-list-item-title
            >
        </v-list-item-content>
        </v-list-item>
    </v-list-item-group>
    </a>
</v-col>
</template>

<script>
export default {
    name: 'File',
    props: {
        file: {
            type: Object,
            required: true
        },
        actions: {
            type: Array,
            required: true
        },
        fileId: {
            type: Number,
            required: true
        }
    },
    methods: {
        handleContextMenu(e){
            this.$store.commit('updateContext', { context: true })

            const id = Number(e.currentTarget.getAttribute('data-id'))
            const rect = e.currentTarget.parentElement.getBoundingClientRect();
            
            
            this.$emit('update-pos', e.clientX - rect.left, e.clientY - rect.top),
            this.$emit('update-file-id', id)
        },
        handleMouseDownLeft(){
            this.$store.commit('updateContext', { context: false })
        }
    }
}
</script>
