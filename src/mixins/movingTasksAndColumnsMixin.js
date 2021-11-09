export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (toTasks !== undefined) {
        if (toTasks.name !== undefined) {
          toTasks = toTasks.tasks
        }
      }
      if (type === 'task') {
        this.moveTask(e, toColumnIndex, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
      }
    },
    moveTask (e, toColumnIndex, toTasks, toTaskIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTasksID = this.board.columns[fromColumnIndex].id
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')
      const toTasksID = this.board.columns[toColumnIndex].id

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTasksID,
        fromTaskIndex,
        toTasks,
        toTaskIndex,
        toTasksID
      })
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    }
  }
}
