export const EnvService = {
  __getEnvVarOrThrowAnException (envVariableName: string) {
    const value = process.env[`REACT_APP_${envVariableName}`]

    if (value) {
      return value
    }

    throw new Error(`"${value}" is not defined in environment variables.`)
  },

  getHostUrl () {
    return EnvService.__getEnvVarOrThrowAnException('HOST_URL')
  }
}
