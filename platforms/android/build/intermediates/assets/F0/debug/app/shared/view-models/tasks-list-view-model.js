var config = require("../config"),
    fetchModule = require("fetch"),
    ObservableArray = require("data/observable-array").ObservableArray,
    Observable = require('data/observable').Observable,
    utils = require("../utils/utils"),
    moment = require("moment");

function TaskListViewModel(items) {
    items = items || [];
    var viewModel = new ObservableArray(items);

    viewModel.load = function() {       
        return fetch(config.apiUrl)
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        }).then(function(data) {         
            data.tasks.sort(utils.arraySorter);
            data.tasks.forEach(function(task) {
                //console.log("HD" + utils.getHumanisedDateFormat(task.due_date));
                viewModel.push({
                    name: task.description,
                    due_date: task.due_date,
                    humanisedDate: utils.getHumanisedDateFormat(task.due_date)
                });
            });
            
        });
    };
    
    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };
    // This does not work. I should I guess, if we updated the model, changes should be reflected inmediatly on UI
    viewModel.add = function(newTask) {
        viewModel.push({
            name: newTask.description,
            date: newTask.due_date
        });
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
/*
function compare(a,b) {
    if (a.due_date < b.due_date)
        return -1;
    if (a.due_date > b.due_date)
        return 1;
    return 0;
}*/

module.exports = TaskListViewModel;