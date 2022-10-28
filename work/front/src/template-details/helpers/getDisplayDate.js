import moment from 'moment';

function getDisplayDate(date) {
    if (date) {
        return moment(date).format("MMM Do YYYY")
    } else {
        return 'No data available'
    }
}

export default getDisplayDate;
