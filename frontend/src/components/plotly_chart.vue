<template>
  <div id="my_chart">
    <!-- <Plotly v-bind:data="data" v-bind:layout="layout" :display-mode-bar="true"></Plotly> -->
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
  components: {},
  data: function () {
    return {
      data: [
        {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          type: 'scatter',
        },
      ],
      layout: {
        title: 'My graph',
      },
    };
  },
  mounted() {
    Plotly.newPlot('my_chart', this.data, this.layout, this.config);
  },
};
</script>
