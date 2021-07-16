<template>
  <pro-layout
    :locale="locale"
    v-bind="state"
    v-model:openKeys="baseState.openKeys"
    v-model:collapsed="baseState.collapsed"
    v-model:selectedKeys="baseState.selectedKeys"
  >
    <template #menuHeaderRender>
      <div>
        <!-- <logo-svg /> -->
        <h1>hello</h1>
      </div>
    </template>
    <router-view />
    <!-- <GlobalFooter
      :links="[{ title: 'baidu', href: 'https:www.baidu.com' }]"
      :copyright="'hello'"
    ></GlobalFooter> -->
    <FooterToolbar>
      <a-space>
        <span :disabled="state.layout !== 'mix'">
          <span style="margin-right: 8px">SplitMenus:</span>
          <a-switch
            v-model:checked="state.splitMenus"
            :disabled="state.layout !== 'mix'"
            checked-children="ON"
            un-checked-children="OFF"
          />
        </span>
        <a-select v-model:value="state.navTheme" style="width: 100px">
          <a-select-option value="light">Light</a-select-option>
          <a-select-option value="dark">Dark</a-select-option>
        </a-select>
        <a-select v-model:value="state.layout" style="width: 100px">
          <a-select-option value="side">Side</a-select-option>
          <a-select-option value="top">Top</a-select-option>
          <a-select-option value="mix">Mix</a-select-option>
        </a-select>
        <a-select v-model:value="state.primaryColor" style="width: 100px">
          <a-select-option
            v-for="(v, k) in presetPrimaryColors"
            :value="v"
            :key="v"
            >{{ k }}</a-select-option
          >
        </a-select>
      </a-space>
    </FooterToolbar>
  </pro-layout>
</template>

<script>
import { defineComponent, onMounted, reactive, watch, watchEffect } from "vue";
import {
  clearMenuItem,
  FooterToolbar,
  GlobalFooter,
} from "@ant-design-vue/pro-layout";
import { ReadOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import theme from "@/utils/theme";
import { getMenuData } from "@/utils/getMenuData";
import { message } from "ant-design-vue";
import { presetPrimaryColors } from "@ant-design/colors/dist/index.esm";

const locale = (i18n) => i18n;

export default defineComponent({
  components: {
    ReadOutlined,
    FooterToolbar,
    GlobalFooter,
  },
  setup() {
    const router = useRouter();
    const { menuData, breadcrumb } = getMenuData(
      clearMenuItem(router.getRoutes())
    );
    console.log(menuData, breadcrumb);
    const baseState = reactive({
      collapsed: false,
      openKeys: [],
      selectedKeys: [],
    });
    const state = reactive({
      splitMenus: false,
      layout: "side",
      isMobile: true,
      fixSiderbar: false,
      fixedHeader: false,
      navTheme: "dark",
      menuData,
      primaryColor: presetPrimaryColors.blue,
      siderWidth: 208,
    });
    watchEffect(() => {
      if (router.currentRoute) {
        baseState.selectedKeys = router.currentRoute.value.matched
          .concat()
          .map((r) => r.path);
        baseState.openKeys = [...baseState.selectedKeys];
      }
    });
    watch(
      () => [state.primaryColor, state.navTheme],
      () => {
        // const hide2 = message.success("切换主题中", 0);
        theme.changeColor(state.primaryColor).then(() => {
          //   hide2();
        });
      }
    );
    onMounted(() => {
      //   const hide = message.success("切换主题中", 0);
      theme.changeColor(state.primaryColor).then(() => {
        // hide();
      });
    });

    return {
      locale,
      state,
      baseState,
      presetPrimaryColors,
    };
  },
});
</script>