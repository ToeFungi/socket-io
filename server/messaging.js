const generateMessage = (from, message) => ({
  from,
  message,
  createdAt: new Date().getTime()
})

export { generateMessage }
