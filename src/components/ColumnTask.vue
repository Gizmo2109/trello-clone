<template>
  <div
    class="task"
    draggable
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, column, columnIndex, taskIndex)"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <span class="w-full flex-no-shrink font-bold" @click.self="goToTask(task)"
    >
      {{ task.name }}
      <div style="float: right;width: 30px">
        <img
          v-if="hover"
          src="https://www.awb-fds.de/wp-content/uploads/2019/11/icon-restmuell-750x750.png"
          style="height: 30px;width: 30px"
          @click.self="deleteTask(column, task)"
        >
      </div>
    </span>
    <p
      v-if="task.description"
      class="w-full flex-no-shrink mt-1 text-sm"
    >
      {{ task.description }}
    </p>
  </div>
</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  mixins: [movingTasksAndColumnsMixin],
  data() {
    return {
      hover: false,
      id: this.id
    }
  },
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    pickupTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    },
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    deleteTask(column, task) {
      this.$store.commit('DELETE_TASK_BY_ID', {
         column,
         task,
      })
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
