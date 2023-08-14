<template>
  <div class="view__home" style="min-height: 100vh;background: #ecf2f4;padding: 1rem;padding-top: calc(3.5rem + 1rem);">
    <div class="input-group d-flex flex-column mt-3">
      <label for="tipSum" class="form-label">TIP INSGESAMT</label>
      <CurrencyInput
        v-model="tipSum"
        :options="{ currency: 'EUR' }"
      ></CurrencyInput>
    </div>
    <div class="input-group d-flex flex-column mt-3">
      <label for="tipSum" class="form-label">MITARBEITER</label>
      <WorkerHandler></WorkerHandler>
    </div>
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
      tipSum: 0
    }
  }
}
</script>