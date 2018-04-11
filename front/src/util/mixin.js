export default {
    filters: {
        timeFormat(date) {
            return new Date(date).toLocaleString("CN", {hour12: false})
        }
    }
}
