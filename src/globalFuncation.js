import Vue from 'vue'

Vue.mixin({
  methods: {
    hasAuthority (authorityCode) {
      const authority = this.$store.state.menus.authority

      return authority.indexOf(authorityCode) > -1
    }
  }
})
