<template>
<v-col style="margin: 12px; padding: 8px; width: 260px; height: 180px;flex-basis: initial; flex-grow: initial; max-width: initial;">
    <div class="item-icons d-flex justify-end mb-1">
    <v-list-item-icon class="ma-0" @click="$emit('addStarred', $event)" :data-id="file.id">
    <v-btn
        icon
        color="#FF616D"
        width="30"
        height="30"
    >
        <v-icon style="font-size: 19px;">mdi-star-outline</v-icon>
    </v-btn>
    </v-list-item-icon>
    <v-list-item-icon class="ma-0" @click="$emit('addTrash', $event)" :data-id="file.id">
        <v-btn
        icon
        color="#DCDCDC"
        width="30"
        height="30"
        >
        <v-icon style="font-size: 19px;">mdi-trash-can-outline</v-icon>
        </v-btn>
    </v-list-item-icon>
    </div>
    <a :href="`data:${file.icons.mimetype};base64,${file.base64}`" :download="file.file.name" style="text-decoration: none; display: block; height: 100%;border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 8px;">
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
            <v-icon :color="file.icons.color" style="font-size: 28px"
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
        }
    }
}
</script>
