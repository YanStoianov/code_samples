<template>
  <functional-calendar
    v-if="!updated"
    v-model="dateData"
    :is-date-range="multiple"
    :is-date-picker="!multiple"
    :change-month-function="true"
    :change-year-function="true"
    date-format="yyyy-mm-dd"
    @changedMonth="changeMonth"
    @dayClicked="selectDay($event)"
  />
</template>
<script>
import moment from "moment";
import { FunctionalCalendar } from "vue-functional-calendar";

export default {
  name: "Calendar",
  components: {
    FunctionalCalendar
  },
  props: {
    multiple: {
      type    : Boolean,
      default : true,
    },
    initDate: {
      type    : Object,
      default : null,
    },
  },
  data: () => ({
    updated  : false,
    dateData : {
      currentDate       : new Date(),
      dateRange         : {start: "".toString(), end: "".toString()},
      selectedDate      : moment().format("YYYY-M-D"),
      selectedDatesItem : "",
      selectedHour      : "00",
      selectedMinute    : "00",
      selectedDates     : [],
    },
  }),
  watch:{
    multiple(newVal, oldVal){
     this.updated = true;
     setTimeout(_ => {
         this.updated = false;
     }, 10);
    },
  },
  created(){
    this.init();
  },
  updated() {
    this.renderCalendar();
  },
  methods: {
    init(){
      if (this.initDate )this.dateData = this.initDate;
    },
    selectDay() {
      this.$emit("select", this.dateData);
      this.$forceUpdate();
    },
    changeMonth(){
      this.$forceUpdate();
    },
    renderCalendar(){
      $(".vfc-day").each(function (index, day) {
        if (
          $(day).find("span.vfc-span-day").hasClass("vfc-marked") ||
          $(day).find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed")
        ) {
          if (
            ($(day).next().find("span.vfc-span-day").hasClass("vfc-marked") &&
                $(day).prev().find("span.vfc-span-day").hasClass("vfc-marked")) ||
            ($(day).next().find("span.vfc-span-day").hasClass("vfc-marked") &&
                $(day).prev().find("span.vfc-cursor-not-allowed").hasClass("vfc-cursor-not-allowed")) ||
            ($(day).next().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed") &&
                $(day).prev().find("span.vfc-span-day").hasClass("vfc-marked")) ||
            ($(day).next().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed") &&
                $(day).prev().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed"))
          ) {
            $(day).find("span.vfc-span-day").removeClass("vfc-end-marked");
            $(day).find("span.vfc-span-day").removeClass("vfc-start-marked");
            $(day).find("div.vfc-base-start").remove();
            $(day).find("div.vfc-base-end").remove();
            $(day).find("span.vfc-span-day").addClass("selected");
          }

          if (
            ($(day).next().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed") ||
                $(day).next().find("span.vfc-span-day").hasClass("vfc-marked")) &&
            !$(day).prev().find("span.vfc-span-day").hasClass("vfc-marked") &&
            !$(day).prev().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed")
          ) {
            $(day).find("span.vfc-span-day").addClass("vfc-start-marked");
            if (!$(day).find("div.vfc-base-start").length) $(day).prepend("<div class='vfc-base-start'></div>");
          }

          if (
            !$(day).next().find("span.vfc-span-day").hasClass("vfc-marked") &&
            !$(day).next().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed") &&
            ($(day).prev().find("span.vfc-span-day").hasClass("vfc-marked") ||
                $(day).prev().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed"))
          ) {
            $(day).find("span.vfc-span-day").addClass("vfc-end-marked");
            if (!$(day).find("div.vfc-base-end").length) $(day).prepend("<div class='vfc-base-end'></div>");
          }

          if (
            !$(day).next().find("span.vfc-span-day").hasClass("vfc-marked") &&
            !$(day).prev().find("span.vfc-span-day").hasClass("vfc-marked") &&
            !$(day).next().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed") &&
            !$(day).prev().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed")
          ) {
            $(day).find("span.vfc-span-day").addClass("vfc-end-marked");
            $(day).find("div.vfc-base-start").remove();
            $(day).find("div.vfc-base-end").remove();
          }
        } else {
          $(day).find("div.vfc-base-start").remove();
          $(day).find("div.vfc-base-end").remove();
        }
      });
    },
  }
};
</script>
<style>
.input-default{
  border        : none;
  padding       : 0.9375rem;
  width         : 100%;
  border-bottom : 0.0625rem solid #e4e4e4
}
.required-logo{
  color:red;
}
.vfc-top-date span.vfc-underline {
  text-decoration: none;
}
</style>
