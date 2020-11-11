
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

const formatDate = (date) => {
  date = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).formatToParts(new Date(Date.parse(date)))

  // const formatedDate = `${date[2].value[0].toUpperCase() + date[2].value.slice(1)} ${date[0].value}, ${date[4].value}`
  const formatedDate = `${date[0].value} de ${date[2].value[0].toUpperCase() + date[2].value.slice(1)} de ${date[4].value}`
  return formatedDate
}

export default formatDate;