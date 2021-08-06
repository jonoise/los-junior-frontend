const dateStringify = (dateString) => {
    const date = dateString.split('T')[0]

    const months = {
        '01': 'Ene',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Abr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Ago',
        '09': 'Set',
        10: 'Oct',
        11: 'Nov',
        12: 'Dic',
    }

    const dateArray = date.split('-')
    const day = dateArray[2]
    const month = dateArray[1]
    const year = dateArray[0]

    const formatMonth = months[month]
    const newDate = `${day}-${formatMonth}-${year}`

    return newDate
}

export default dateStringify