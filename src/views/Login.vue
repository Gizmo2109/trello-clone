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
    <button type="submit" name="button" @click="getBoards()">
      Für mich zugängliche Boards anzeigen
    </button>
    <div v-for="boardname in boards2">
      <div @click="weiterLeit(boardname)">{{ boardname }}</div>
    </div>
  </div>
</template>


<script>

export default {
  data () {
    return {
      username: '',
      password: '',
      boards2: []
    }
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
      this.$store.watch(
        () => {
          return this.$store.state.boards
        }, () => {
          this.boards2 = this.$store.state.boards
        }
      )
    },
    weiterLeit (boardname) {
      this.$router.push('/board/' + boardname)
    }
  }

}
</script>
