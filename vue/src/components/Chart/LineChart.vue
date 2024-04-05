<template>
  <div :style="`width: ${width}%`">
    <canvas ref="line_chart" class="chart__line" />
  </div>
</template>


<script>
import Chart from "chart.js";

export default {
  props: {
    chartData: {
      type     : Object,
      required : true,
    },
    options: {
      type     : Object,
      default  : Object,
    }
  },
  computed: {
    chartDataSize () {
      return this.chartData.labels.length;
    },
    width() {
      const correct = _.clamp(0, 12, this.chartDataSize);
      switch (correct) {
        case 1  : return 100;
        case 2  : return (100 / 14.5);
        case 3  : return (100 / (23.5 - (correct * 0.5))) * correct;
        case 4  : return (100 / (21.2 - (correct * 0.42))) * correct;
        case 5  : return (100 / (20.3 - (correct * 0.42))) * correct;
        case 6  : return (100 / (20.1 - (correct * 0.425))) * correct;
        case 7  : return (100 / (20.1 - (correct * 0.425))) * correct;
        case 8  : return (100 / (20.1 - (correct * 0.42))) * correct;
        case 9  : return (100 / (20.2 - (correct * 0.41))) * correct;
        case 10 : return (100 / (20.3 - (correct * 0.40))) * correct;
        case 11 : return (100 / (20.4 - (correct * 0.39))) * correct;
        case 12 : return (100 / (20.5 - (correct * 0.38))) * correct;
        default : return (100 / (20.5 - (correct * 0.38))) * correct;
      }
    },
  },
  mounted() {
    new Chart(
      this.$refs.line_chart,
      {
        type    : "line",
        data    : this.chartData,
        options : this.options,
      }
    );
  },
};
</script>
<style>
.chart__line {
  position : relative;
  right    : -0.25rem;
  width    : 100%;
}
</style>
