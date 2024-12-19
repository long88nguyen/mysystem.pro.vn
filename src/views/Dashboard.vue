<template>
    <div class="d-flex">
        <div class="sidebar">
            <a-menu
                v-model:openKeys="state.openKeys"
                v-model:selectedKeys="state.selectedKeys"
                mode="inline"
                theme="light"
                :inline-collapsed="state.collapsed"
                :items="items"
                @click="handleClick"
            ></a-menu>
        </div>
        <div class="body">
            <div class="header-body">
                <div class="pe-4 d-flex justify-content-end align-items-center h-100">
                    <a-dropdown>
                        <a-avatar style="background-color: #87d068">
                            <template #icon>
                                <UserOutlined />
                            </template>
                        </a-avatar>
                        <template #overlay>
                            <a-menu @click="handleMenuClick">
                            <a-menu-item key="1">
                                <UserOutlined />
                                Profile
                            </a-menu-item>
                            <a-menu-item key="2">
                                <UserOutlined />
                                Setting
                            </a-menu-item>
                            <a-menu-item key="3">
                                <UserOutlined />
                                Logout
                            </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </div>
            <div class="main_body p-3">
                <router-view></router-view>
            </div>
        </div>
    </div>
    
  </template>
  <script setup>
  import { reactive, watch, h } from 'vue';
  import EmployeeIndex from "../views/pages/employees/Index.vue"
  import { useRoute,useRouter } from 'vue-router';
  import {
    UserOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  } from '@ant-design/icons-vue';

  const route = useRoute();
  const router = useRouter();
  const state = reactive({
    collapsed: false,
    selectedKeys: [route.name],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
  });
  console.log(route.name);
  
  const items = reactive([
    {
      key: 'PronounCheck',
      icon: () => h(PieChartOutlined),
      label: 'Check Phát âm',
      title: 'Option 1',
    },
    {
      key: 'ListChatRoom',
      icon: () => h(DesktopOutlined),
      label: 'Trợ lý ảo',
      title: 'Option 2',
    },
  ]);

  const handleClick = (e) => {
    router.push({
      name: e.key
    })
  }
  watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    },
  );
  const toggleCollapsed = () => {
    state.collapsed = !state.collapsed;
    state.openKeys = state.collapsed ? [] : state.preOpenKeys;
  };
  </script>

<style scoped>
.sidebar{
    min-height: 100vh;
    width: 256px;
}
.body{
    width: calc(100% - 256px);
}

.header-body{
    width: 100%;
    height: 60px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>