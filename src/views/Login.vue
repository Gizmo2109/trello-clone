<template>
  <div>
    <form @submit.prevent="login">
      <label for="username">
        Username:
      </label>
      <input v-model="username" type="text" name="username" value>

      <label for="password">
        Password:
      </label>
      <input v-model="password" type="password" name="password" value>

      <button type="submit" name="button">
        Login
      </button>
    </form>
    <board
      v-for="(board2, $boardIndex) of boards"
      :key = "$boardIndex"
      :board2 = "board2"
      :boardIndex = "$boardIndex"
    />
  </div>
</template>


<script>
import board from '@/components/board'

export default {
  components: { board },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  props: {
    boards: [],
  },
  methods: {
    login () {
      this.$store.commit('LOGIN', {
          username: this.username,
          password: this.password
        })
    },
    getBoards () {
      this.$store.commit('GET_BOARDS')
    }
  }

}
</script>
