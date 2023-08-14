<template>
  <div class="worker-handler p-2 bg-white rounded border d-flex">
    <div class="worker-item border rounded p-1" style="margin-right: .4rem;background: rgb(236, 242, 244)" v-for="worker in workers" :key="worker">
      <span class="px-1"><b>{{worker.name}}</b></span>
      <br>
      <small class="px-1">Stunden: <b>{{worker.hours}}h</b></small>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkerHandler",
  data() {
    return {
      workers: [
        {
          name: "Joel",
          hours: 3.5
        },
        {
          name: "Kim",
          hours: 7.0
        },
        {
          name: "Jesus",
          hours: 4.0
        }
      ]
    }
  }
}
</script>