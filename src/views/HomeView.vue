<template>
  <div class="view__home" style="min-height: 100vh;background: #ecf2f4;padding: 1rem;padding-top: calc(3.5rem + 1rem);" v-if="!isCalculating">
    <div class="input-group d-flex flex-column mt-3">
      <label for="tipSum" class="form-label">MITARBEITER</label>
      <WorkerHandler ref="workerHandler" @changedWorkers="checkWorkers($event)"></WorkerHandler>
    </div>
    <div class="input-group d-flex flex-column mt-3">
      <label for="tipSum" class="form-label">TIP INSGESAMT</label>
      <CurrencyInput
          v-model="tipSum"
          :options="{ currency: 'EUR' }"
      ></CurrencyInput>
    </div>
    <button class="btn btn-success btn-lg w-100 rounded mt-5" style="font-weight: 500" :disabled="!readyForCalc" @click="startCalculating()">
      AUSRECHNEN
    </button>
  </div>
  <div class="view__result" style="min-height: 100vh;background: #ecf2f4;padding: 1rem;padding-top: calc(3.5rem + 1rem);" v-else>
    <div class="show-workers d-flex flex-column pt-4">
      <div class="calculated-worker w-100 p-2 rounded border bg-white mt-2" v-for="worker in this.calculatedWorkers" :key="worker">
        <h2>{{worker.name}}</h2>
        <h2><b>{{worker.calcTip.toFixed(2)}}€</b></h2>
      </div>
    </div>
    <button class="w-100 btn btn-primary btn-lg rounded mt-4" @click="this.$router.go(this.$router.currentRoute)">NEUE BERECHNUNG</button>
  </div>
</template>

<style>
label.form-label {
  font-size: 1.5rem;
}
</style>

<script>
import CurrencyInput from "@/components/CurrencyInput.vue";
import WorkerHandler from "@/components/WorkerHandler.vue";
export default {
  name: "HomeView",
  components: {
    CurrencyInput,
    WorkerHandler
  },
  data() {
    return {
      tipSum: 0,
      readyForCalc: false,
      workers: [],
      isCalculating: false,
      calculatedWorkers: []
    }
  },
  watch: {
    tipSum(oldVal, newVal) {
      if (newVal > 0 && newVal !== 0) {
        if (this.workers.length >= 2) {
          this.readyForCalc = true
        }
      }
    },
    workers() {
      if (this.workers.length >= 2) {
        if (this.tipSum > 0 && this.tipSum !== 0) {
            this.readyForCalc = true
          }
        }
    }
  },
  methods: {
    startCalculating() {
      this.isCalculating = true

      let completeHours = 0
      for (let i = 0; i < this.workers.length; i++) {
        completeHours = completeHours + this.workers[i].hours
      }

      let euroPerHour = (this.tipSum / completeHours)

      for (let i = 0; i < this.workers.length; i++) {
        let newWorker = {
          name: this.workers[i].name,
          calcTip: (euroPerHour * this.workers[i].hours),
          hours: this.workers[i].hours
        }

        this.calculatedWorkers.push(newWorker)
      }

      console.log(this.$refs["workerHandler"].$data.workers)
      console.log("start")
    },
    checkWorkers(e) {
      this.workers = e
    }
  }
}
</script>