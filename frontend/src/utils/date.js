import dayjs from 'dayjs'

export default function formatDate(date){
    return dayjs(date).format("DD/MM/YYYY")
}

export function formatDatePicker(date){
    return dayjs(date).format("YYYY-MM-DD")
}

export function formatTime(date){
    return dayjs(date).format("HH:mm")
}
export function isSameDay(date1, date2){
    return dayjs(date1).isSame(date2, 'day')
}