var TaskListViewModel = require("./shared/view-models/tasks-list-view-model");
var frameModule = require("ui/frame");
var  firstRun = true;
var tasksList = new TaskListViewModel([]);
var page;

exports.loaded = function(args) {   
    page = args.object;
    page.bindingContext = {
        items: tasksList
    };
   if(firstRun){
       tasksList.empty();
       tasksList.load();
       firstRun = false;
   }
     
};

exports.addTask = function() {    
    var topmost = frameModule.topmost();
    var navigationOptions={
        moduleName:"views/addTask",
        context: page //tasksList // Tried to pass model to bind from addTask, but does not work so I have to pass bidingcontext instead
    };
    topmost.navigate(navigationOptions);
};

exports.navigatingTo = function(e) {  
    if (e.isBackNavigation) {
        /*
        // it does not work, updating the model should be reflected automatically in UI, but it does not work
        tasksList.add({
            name: "Test",//tasksList.get("newTask"),
            date: "2016-01-01"
        });
        // Tried to refresh the bindingContext after updating the model, but it does not work either
        page.bindingContext = {
            items: tasksList
        };
        */
    } else {
        console.log('isNOT BackNavigation');
    }  
};


