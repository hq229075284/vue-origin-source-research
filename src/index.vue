<template>
    <div><input type="text" v-model="valueA"></div>
</template>
<script setup>
import {ref} from 'vue'
const valueA=ref('1')
</script>