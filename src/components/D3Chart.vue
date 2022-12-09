<!-- <template>
 <div class="q-pa-md">
   <q-select outlined v-model="model"
   :options="projectionTypes"
   label="Projection"
   @update:model-value="(val) => update_projection(val)"/>
  <svg class="chart" style="width: 700px; height: 900px;">
    <g class="graticule"><path></path></g>
    <g class="map"></g>
  </svg>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import versor from 'components/versor.js';
// import { api } from 'boot/axios';
import * as d3 from 'd3';
const model = ref(null);
let projectionTypes = ref([
  'AzimuthalEqualArea',
  'AzimuthalEquidistant',
  'Gnomonic',
  'Orthographic',
  'Stereographic',
  'Albers',
  'ConicConformal',
  'ConicEqualArea',
  'ConicEquidistant',
  'Equirectangular',
  'Mercator',
  'TransverseMercator'
]);
function update_projection(val){
  console.log(val);
  state.value.type = val;
  update();
}
let state = ref({
  type: 'AzimuthalEqualArea',
  scale: 100,
  translateX: 350,
  translateY: 250,
  centerLon: 0,
  centerLat: 0,
  rotateLambda: 0.1,
  rotatePhi: 0,
  rotateGamma: 0
});

const geojson = ref(null);
let projection = ref(null);
let geoGenerator = d3.geoPath().projection(projection.value);
let graticule = d3.geoGraticule();

// let drag = d3.drag().on('drag', handleDrag);

// function handleDrag(e) {
//   console.log(e)
//   state.value.translateX += e.dx;
//   state.value.translateY += e.dy;
//   // projection
//   //   .translate([e.x, e.y])

//   update();
// }

// function initDrag() {
// 	d3.select('.chart').call(d3.drag().on('drag', () => drag(projection)));
//   // d3.select('.chart').call(d3.drag().on('drag', handleDrag));
// }

function update() {
  projection.value = d3['geo' + state.value.type]().precision(0.1)
  geoGenerator.projection(projection.value);

  projection.value
    .scale(state.value.scale)
    .translate([state.value.translateX, state.value.translateY])
    .center([state.value.centerLon, state.value.centerLat])
    .rotate([state.value.rotateLambda, state.value.rotatePhi, state.value.rotateGamma])
  // d3.select('.chart')
  //   .call(drag());

  let svg = d3.select('g.map')
    .selectAll('path')
    .data(geojson.value.features)
    .join('path')
    // .call(d3.drag().on('drag', (e) => {
    //     state.value.translateX += e.x;
    //     state.value.translateY += e.y;
    //     console.log([e.x, e.y])
    //     projection.value.translate([state.value.translateX, state.value.translateY])
    //     geoGenerator.projection(projection.value);
    //   }))
    .attr('d', geoGenerator);


  d3.select('.graticule path')
    .datum(graticule())
    .attr('d', geoGenerator);
}

onMounted(() => {
// load_geojson();
  d3.json(`https://${process.env.API_URL}/json/ne_110m_land.json`).
  then(function(json) {
    geojson.value = json;
    console.log(geojson.value)
		update();
    // initDrag();
  });
});


function drag() {
  let v0, q0, r0, a0, l;

  function pointer(event, that) {
    const t = d3.pointers(event, that);

    if (t.length !== l) {
      l = t.length;
      if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
      dragstarted.apply(that, [event, that]);
    }

    // For multitouch, average positions and compute rotation.
    if (l > 1) {
      const x = d3.mean(t, p => p[0]);
      const y = d3.mean(t, p => p[1]);
      const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
      return [x, y, a];
    }

    return t[0];
  }

  function dragstarted(event) {

    v0 = versor.cartesian(projection.value.invert(pointer(event, this)));
    q0 = versor(r0 = projection.value.rotate());
        console.log(v0, q0)
  }

  function dragged(event) {
    console.log(event)
    const p = pointer(event, this);
    const v1 = versor.cartesian(projection.value.rotate(r0).invert(p));
    const delta = versor.delta(v0, v1);
    let q1 = versor.multiply(q0, delta);


    // For multitouch, compose with a rotation around the axis.
    if (p[2]) {
      const d = (p[2] - a0) / 2;
      const s = -Math.sin(d);
      const c = Math.sign(Math.cos(d));
      q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1);
    }

    projection.value.rotate(versor.rotation(q1));

    // In vicinity of the antipode (unstable) of q0, restart.
    if (delta[0] < 0.7) dragstarted.apply(this, [event, this]);
  }

  return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged);
}
</script>

<style scoped>
svg {
  border: 1px solid #eee;
}

.map path {
  fill: #87B687;
  stroke: #777;
}

/* .projection-center {
  fill: red;
} */

.graticule path {
  fill: none;
  stroke: #eee;
}
</style> -->