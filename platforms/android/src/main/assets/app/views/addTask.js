var frameModule = require("ui/frame"),
    moment = require("moment"),
    modelParent = null,
    modelCurrentScreen = { newTask: "", due_date:"" },
    utils = require("../shared/utils/utils");

var today = moment().format('YYYY-MM-DD');

exports.loaded = function(args) {
    var page = args.object;
    modelParent = page.navigationContext;
    page.bindingContext = modelCurrentScreen;  
};


exports.add = function(){
    
    if(modelCurrentScreen.newTask.length > 0 && modelCurrentScreen.due_date.length > 0) {
        if(checkFormatDate(modelCurrentScreen.due_date)) {
            var due_dateMoment = moment(modelCurrentScreen.due_date);
            if (due_dateMoment.diff(today, 'days', true) >= 0){
                //I had to update the bindingContext to get this updated. This works but I guess this is not the way to do this
                modelParent.bindingContext.items.push({
                    name: modelCurrentScreen.newTask,
                    due_date: modelCurrentScreen.due_date,
                    humanisedDate: utils.getHumanisedDateFormat(modelCurrentScreen.due_date)
                });
                modelParent.bindingContext.items.sort(utils.arraySorter);
                modelCurrentScreen = { newTask: "", due_date:"" };
                frameModule.topmost().goBack();
            } else {
                alert('Date must be in future');
            }
        } else {
            alert('Date must be YYYY-MM-DD format');
        }
    } else {
        alert('Please, fill both fields.');
    }

    function checkFormatDate(date){
        var firstHyphen = date.indexOf('-');
        var monthAndDayPart = date.substring(firstHyphen + 1);
        var secondHyphen = monthAndDayPart.indexOf('-');
        if(date.length === 10 && firstHyphen === 4 && secondHyphen === 2 && monthAndDayPart.substring(0, 2) < 13){
            return true;
        } else {
            return false;
        }
    }
};