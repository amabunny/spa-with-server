export const RouterService = {
  getIndexRoute () {
    return '/' as const
  },

  getLoginRoute () {
    return '/login' as const
  },

  getRegisterRoute () {
    return '/register' as const
  },

  getAdminRoute () {
    return '/admin' as const
  }
}
