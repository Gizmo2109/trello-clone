<template>
  <div
    class="column"
    draggable
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <div class="flex items-center mb-2 font-bold" @mouseover="hover2 = true" @mouseleave="hover2 = false">
      {{ column.name }}
      <div style="float: right;width: 30px">
        <img
          v-if="hover2"
          src="https://www.awb-fds.de/wp-content/uploads/2019/11/icon-restmuell-750x750.png"
          style="height: 30px;width: 30px"
          @click.self="deleteColumn(column.id)"
        >
      </div>
    </div>
    <div class="list-reset">
      <ColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :taskIndex="$taskIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board"
      />

      <input
        type="text"
        class="block p-2 w-full bg-transparent"
        placeholder="+ Neue Task"
        @keyup.enter="createTask($event, column.tasks, column)"
      />
    </div>
  </div>
</template>

<script>
import ColumnTask from './ColumnTask'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  data() {
    return {
      hover2: false,
    }
  },
  components: { ColumnTask },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    createTask (e, tasks, column) {
      if (e.target.value === '') {
        alert("Eintrag net vergessen")
      } else {
        this.$store.commit('CREATE_TASK', {
          column,
          name: e.target.value
        })
        e.target.value = ''
      }
    },
    deleteColumn (id) {
      this.$store.commit('DELETE_COLUMN', {
        id
      })
    }
  }
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
