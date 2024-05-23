<template>
  <div class="footer">
    <ul class="w-100 h-100 d-flex justify-content-evenly align-items-center p-0 m-0">
        <li class="list-unstyled" v-for="(item,index) in menu" :key="index" :class="{'active' : activeKey == item.key}" @click="updateMenuSelected(item.key)">
            <i :class="`${item.iconClass} ${activeKey == item.key ? 'text-primary' : ''}`"></i>
        </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeKey = ref('home')
const menu = ref([
    {
        key: "home",
        iconClass: "fa-solid fa-house",
        url: null,
    },
    {
        key: "search",
        iconClass: "fa-solid fa-magnifying-glass",
        url: null,
    },
    {
        key: "heart",
        iconClass: "fa-solid fa-heart",
        url: null,
    },
    {
        key: "user",
        iconClass: "fa-solid fa-user",
        url: null,
    },
])

const updateMenuSelected = (itemKey) => {
    activeKey.value = itemKey
}
</script>

<style lang="scss">
.footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 60px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    ul{
        li{
            i{
                font-size: 18px;
                color:silver;
            }
            padding-bottom: 3px;
        }
        .active{
            border-bottom: 2px solid rgb(13,110,253);
        }
    }
}

@media (max-width: 576px)
{
    .footer{
        height: 50px;
        padding: 10px;
    }
}
</style>