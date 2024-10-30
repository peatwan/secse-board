export const getTimeDifference = (date1: Date, date2: Date) => {
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime())

  const seconds = Math.floor((diffInMilliseconds / 1000) % 60)
  const minutes = Math.floor((diffInMilliseconds / (1000 * 60)) % 60)
  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))

  return {
    hours,
    minutes,
    seconds
  }
}
