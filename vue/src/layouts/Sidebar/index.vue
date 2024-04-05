<template>
  <div class="layout_sidebar-wrapper">
    <main
      v-if="!isProfilePage"
      class="layout_sidebar"
    >
      <navigation-side-bar-wrapper
        class="layout_sidebar__sidebar"
        :class="classSidebar"
      >
        <template #header>
          <slot name="header" />
        </template>
        <slot name="navigation" />
      </navigation-side-bar-wrapper>
      <slot class="layout_sidebar__content" />
    </main>
    <slot v-else class="layout_sidebar__content" />
  </div>
</template>
<script>
export default {
  components: {
    NavigationSideBarWrapper: () => import("@/components/app2/NavigationSideBar/Wrapper"),
  },
  props: {
    classSidebar: {
      type    : [String, Object, Array],
      default : "",
    },
    styleSidebar: {
      type    : [String, Object, Array],
      default : "",
    },
    isProfilePage: {
      type: Boolean,
      default: false
    }
  },
};
</script>
<style scoped>
.layout_sidebar-wrapper {
  width: 100%;
  padding-left: var(--navigation-width);
}
.layout_sidebar {
  --navigation-width : clamp(4em, 3.75vw, 4.5em);
  width              : 100%;
  display            : inline-block;
  min-height         : 100dvh;
  padding-left       : var(--navigation-width);
  color              : var(--neutral-100-color);
  box-sizing         : border-box;
}
.layout_sidebar__sidebar {
  display  : inline-flex;
  position : fixed;
  top      : 0;
  bottom   : 0;
  left     : 0;
  color    : var(--neutral-10-color);
  z-index  : 100;
}
</style>
