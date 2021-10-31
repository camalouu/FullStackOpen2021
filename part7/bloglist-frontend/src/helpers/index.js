export const isEmptyObject = obj => {
  return JSON.stringify(obj) === '{}'
}

export const trycatch = async (asyncFn, ...args) => {
  try {
    const result = await asyncFn(...args)
    return [null, result]
  } catch ({ response }) {
    return [response.data.error, null]
  }
}