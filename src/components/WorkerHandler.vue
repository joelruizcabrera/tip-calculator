<template>
  <div class="worker-handler p-2 pt-1 bg-white rounded border d-flex flex-wrap">
    <div class="worker-item border rounded p-1 position-relative mt-1" style="margin-right: .4rem;background: rgb(236, 242, 244)" v-for="(worker, index) in workers" :key="worker">
      <div v-if="worker.toggleRemove" class="worker-remove position-absolute top-0 w-100 h-100 rounded d-flex justify-content-center align-items-center" style="background: rgba(255,100,100,.6);backdrop-filter: blur(5px);left: 0;color: #fff" @click="removeWorker(index)">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
      </div>
      <div @click="toggleRemove(index)">
        <span class="px-1"><b>{{worker.name}}</b></span>
        <br>
        <small class="px-1">Stunden: <b>{{worker.hours}}h</b></small>
      </div>
    </div>
    <button type="button" class="worker-item border rounded p-1 mt-1 worker-item-add bg-success d-flex align-items-center justify-content-center" style="margin-right: .4rem;aspect-ratio: 1; min-width: 61px" data-bs-toggle="modal" data-bs-target="#addWorkerModal">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff">
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
      </svg>
    </button>
    <div class="modal fade" id="addWorkerModal" tabindex="-1" aria-labelledby="addWorkerModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addWorkerModalLabel">Mitarbeiter hinzufügen</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group d-flex flex-column">
              <label for="workerName" class="form-label">Name</label>
              <input type="text" class="form-control w-100 rounded" v-model="newWorkerName">
            </div>
            <div class="input-group d-flex flex-column mt-4">
              <label for="workerHour" class="form-label">Stunden</label>
              <input type="number" class="form-control w-100 rounded" v-model="newWorkerHour">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Schließen</button>
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="addNewWorker()">Hinzufügen</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.worker-remove {
  opacity: 0;
  animation: fadeInWorker .3s ease forwards;
}
@keyframes fadeInWorker {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<script>
export default {
  name: "WorkerHandler",
  data() {
    return {
      newWorkerName: "",
      newWorkerHour: 0,
      workers: [
        {
          name: "Joel",
          hours: 3.5,
          toggleRemove: false
        },
        {
          name: "Kim",
          hours: 7.0,
          toggleRemove: false
        },
        {
          name: "Jesus",
          hours: 4.0,
          toggleRemove: false
        }
      ]
    }
  },
  methods: {
    toggleRemove(i) {
      if (this.workers[i].toggleRemove === false) {
        this.workers[i].toggleRemove = true
        setTimeout(() => {
          this.workers[i].toggleRemove = false
        }, 2000)
      } else {
        this.workers[i].toggleRemove = false
      }
    },
    removeWorker(i) {
      this.workers.splice(i, 1)
    },
    addNewWorker() {
      let newWorker = {
        name: this.newWorkerName,
        hours: this.newWorkerHour,
        toggleRemove: false
      }

      this.workers.push(newWorker)

      this.newWorkerName = ""
      this.newWorkerHour = 0
    }
  }
}
</script>