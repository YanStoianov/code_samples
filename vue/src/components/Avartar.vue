<template>
  <div class="avatar-symbol" :style="`background-color:${getRandomColor}`">
    {{ symbol }}
  </div>
</template>
<script>

import {avatarColors} from "@/constants/color";

export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  data(){
    return {
      colors: avatarColors
    };
  },
  computed: {
    symbol() {
      const phrases = this.name.split(" ");
      if (phrases.length >= 2) {
        return `${phrases[0].substr(0, 1)}${phrases[1].substr(0, 1)}`.toUpperCase();
      }
      return phrases[0].substr(0, 2).toUpperCase();
    },
    getRandomColor() {
      let randomIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomIndex];
    },
  },
};
</script>
<style scoped>
.avatar-symbol {
  width               : 3.125rem;
  min-width           : 3.125rem;
  height              : 3.125rem;
  margin              : auto;
  color               : white;
  display             : inline-flex;
  justify-content     : center;
  align-items         : center;
  overflow            : hidden;
  user-select         : none;
  position            : relative;
  border-radius       : 2.5rem;
  transition          : 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property : color, background-color;
  will-change         : color, background-color;
  font-size           : 1.375rem;
  font-weight         : 600;
  letter-spacing      : normal;
  vertical-align      : middle;
  box-shadow          :
    0 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),
    0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.12);
}
</style>
