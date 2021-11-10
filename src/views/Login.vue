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
  </div>
</template>


<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.commit('LOGIN', {
          username: this.username,
          password: this.password
        })
    }
  }

}
</script>
