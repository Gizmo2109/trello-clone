import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'
import {counter} from "@fortawesome/fontawesome-svg-core";
import {cli} from "tailwindcss/lib/cli/constants";
import {content} from "@fullhuman/postcss-purgecss/__tests__/fixtures/src/config/config";
import {stringify} from "querystring";
const axios = require('axios').default

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK (state, { name, column }) {
      axios.post('http://localhost:8080/column/' + column.id, {
        "name": name,
        "description": '',
        "id": uuid()
      })
        .then(response => {
          let test = state.board.columns.findIndex(x => x.name === column.name)
          console.log(state.board.columns[test])
          if (state.board.columns[test].tasks === undefined) {
            state.board.columns[test].push({"tasks": []})
          }
          state.board.columns[test].tasks.push({"id": response.data.id, "description": response.data.description, "name": response.data.name})
        })
    },
    DELETE_COLUMN (state, id) {
      let id2 = stringify(id)
      let id3 = id2.slice(3)
      axios.delete('http://localhost:8080/column/' + id3)
        .then(response => {
          console.log(response)
        })
      state.board.columns = state.board.columns.filter((column) => column.id !== id3)
    },
    DELETE_TASK (state, { column, task }) {
      const test = state.board.columns.findIndex(x => x.name === column)
      const test2 = state.board.columns[test].tasks.findIndex(x => x.name === task)
      if (test === -1 || test2 === -1) {

      } else {
        state.board.columns[test].tasks.splice(test2, 1)

      }
    },
    DELETE_TASK_BY_ID (state, { task, column }) {
      const clickedColumn = state.board.columns.find(col => col === column)
      clickedColumn.tasks = clickedColumn.tasks.filter(x => x !== task)
    },
    CREATE_COLUMN (state, { name }) {
      axios.post('http://localhost:8080/board', {
        "name": name,
        "id": uuid(),
        "tasks": []
      })
        .then(response => {
          console.log(response.data)
          state.board.columns.push({name: response.data.name, tasks: response.data.tasks, id: response.data.id})
        })
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns

      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
    API_GET (state) {
      axios.get('http://localhost:8080/board')
        .then(response => {
          state.board.columns = response.data._embedded.board
        })
    }
  }
})
