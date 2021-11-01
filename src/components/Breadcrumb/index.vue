<template>
    <div class="breadcrumb-attrs">
        <a-breadcrumb separator=">">
            <a-breadcrumb-item style="margin-left:10px">斗泉后台</a-breadcrumb-item>
            <a-breadcrumb-item v-for="item of breadList" :key="item.key">{{item.title}}</a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>


<script lang="ts">
import { defineComponent,computed, toRefs,} from 'vue'
import {useStore} from 'vuex'
import {StateStoreProps} from '../../store/state'
export default defineComponent({
    setup() {
        const store = useStore<StateStoreProps>()
        const NavigationsData = computed(()=>store.state.NavigationsData)
        const breadList = computed(()=>store.state.breadList)
        return {
            NavigationsData,breadList
        }
    },
})
</script>


<style lang="scss" scoped>
.breadcrumb-attrs{width:100%;height:40px;display:flex;align-items:center;}
</style>