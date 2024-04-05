<template>
  <div class="collapse-panel">
    <div class="collapse-panel-header">
      <slot name="header" />
      <md-button class="md-icon-button md-simple collapse-button" :class="`mr-${spacing}, ${position}`" @click="toggle">
        <md-icon v-if="isExpanded" class="icon">
          keyboard_arrow_down
        </md-icon>
        <md-icon v-if="!isExpanded" class="icon">
          keyboard_arrow_right
        </md-icon>
      </md-button>
    </div>
    <div v-if="isExpanded" class="collapse-panel-content">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    defaultStatus: {
      type    : Boolean,
      default : false,
    },
    spacing: {
      type    : Number,
      default : 50,
    },
    position: {
      type    : String,
      default : "collapse-button-position",
    },
  },
  data() {
    return {
      isExpanded: true,
    };
  },
  watch: {
    defaultStatus () {
      const currentStatus = Boolean(this.defaultStatus);
      if (currentStatus !== this.isExpanded) this.isExpanded = currentStatus;
    }
  },
  created() {
    this.isExpanded = this.defaultStatus;
  },
  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded;
    },
  }
};
</script>
<style scoped>
.collapse-panel {
  width   : 100%;
}
.collapse-panel .collapse-panel-header {
  width    : 100%;
  position : relative;
}
.collapse-panel .collapse-panel-content {
  width    : 100%;
}
.collapse-panel .collapse-panel-header .collapse-button {
  align-self: flex-end;
  position  : absolute;
  right     : -0.5rem;
  top       : 1.1rem;
  transform : translateY(-50%);
  margin    : 0;
  width     : 2.1875rem;
  height    : 2.1875rem;
}
.collapse-panel .collapse-panel-header .collapse-button .icon {
  font-size: 2.1875rem !important;
}
.collapse-button-position {
  left     : -0.5rem;
  top       : 1.1rem;
}
</style>
