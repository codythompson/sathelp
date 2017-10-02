<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <orb-calc :app-state="appState" v-on:state-change="handleStateChange"></orb-calc>
        </div>
        <div class="col-md-6">
          <orb-viewer></orb-viewer>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <app-footer :version="appState.version"></app-footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrbCalc from './components/OrbCalc'
import OrbViewer from './components/OrbViewer'
import AppFooter from './components/AppFooter'
import AppState from './appstate'

// exposing globally for debug purposes only
window.AppState = AppState;

export default {
  name: 'app',
  components: {
    OrbCalc,
    OrbViewer,
    AppFooter
  },
  data: function () {
    return {
      appState: AppState.state
    };
  },
  methods: {
    handleStateChange: function (stateChangeEvent) {
      AppState.set(stateChangeEvent.field, stateChangeEvent.newVal);
    }
  }
}
</script>

<style>
#app {
  min-width: 320px;
}
</style>
