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
                <EmployeeIndex></EmployeeIndex>
            </div>
        </div>
    </div>
    
  </template>
  <script setup>
  import { reactive, watch, h } from 'vue';
  import EmployeeIndex from "../views/pages/employees/Index.vue"
  import {
    UserOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  } from '@ant-design/icons-vue';
  const state = reactive({
    collapsed: false,
    selectedKeys: ['1'],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
  });
  const items = reactive([
    {
      key: '1',
      icon: () => h(PieChartOutlined),
      label: 'Option 1',
      title: 'Option 1',
    },
    {
      key: '2',
      icon: () => h(DesktopOutlined),
      label: 'Option 2',
      title: 'Option 2',
    },
  ]);
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