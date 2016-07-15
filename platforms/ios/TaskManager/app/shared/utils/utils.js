
var moment = require("moment");

exports.getHumanisedDateFormat = function(dateString) {
    var humanisedDate = "",
        dateMoment = moment(dateString),
        today = moment().format('YYYY-MM-DD'),
        days = dateMoment.diff(today, 'days', true);
        
    if (days === 1) {
        humanisedDate += days + " day ";
    } else if (days > 1) {
        humanisedDate += days + " days ";
    } else if (days === 0){
        humanisedDate = "Today";
    } else if (days < 0){
        humanisedDate = "Missed " + String(days).substring(1) + " ago";
    }
    return humanisedDate;
};

exports.arraySorter = function(a,b){
    if (a.due_date < b.due_date)
        return -1;
    if (a.due_date > b.due_date)
        return 1;
    return 0;
};