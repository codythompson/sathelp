<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <orb-calc></orb-calc>
        </div>
        <div class="col-md-6">
          <orb-viewer></orb-viewer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrbCalc from './components/OrbCalc'
import OrbViewer from './components/OrbViewer'

export default {
  name: 'app',
  components: {
    OrbCalc,
    OrbViewer
  }
}
</script>

<style>
</style>
