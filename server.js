var express = require("express");
var app = express();

var mongoose = require("mongoose");

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static( __dirname + '/restfulTasksAngular/dist' ));

// Get all tasks
app.get("/tasks", function(req, res) {
    Task.find({}, function(err, allTasks) {
        if(err) {
            console.log("error retrieving all tasks!");
            res.json({message: "Error", error:err});
        } else {
            res.json({tasks: allTasks});
        }
    })
})

// Get task by ID
app.get("/tasks/:id", function(req, res) {
    Task.findById(req.params.id, function(err, targetTask) {
        if(err) {
            console.log("Error retrieving target task!");
        } else {
            res.json({task: targetTask});
        }
    })
})

// Create new task
app.post("/tasks", function(req, res) {
    var task = new Task({
        title: req.body.title,
        description: req.body.description
    });

    console.log(req.body);
    console.log(task);

    task.save(function(err) {
        if(err) {
            console.log("new task error", err);
        } else {
            console.log("successfully added a new task");
        }
    })
})

// Edit Task
app.put("/tasks/:id", function(req, res) {
    Task.findById(req.params.id, function(err, targetTask) {

        if (err) {
            console.log("Error updating task");
        } else {
            targetTask.description = req.body.description;
            targetTask.title = req.body.title;
            targetTask.completed = req.body.completed;
            targetTask.save(function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("successfully updated task!");
                    res.json({ task: targetTask })
                }
            })
        }
    })
})

// Delete task by ID
app.delete("/tasks/:id", function(req, res) {
    Task.remove({_id: req.params.id}, function(err, targetTask) {
        
        if(err) {
            console.log("Error deleting task");
        } else {
            console.log("Found and deleted task");
        }
    })
})

app.listen(8000, function() {

    console.log("listening on port 8000");
})

mongoose.connect("mongodb://localhost/Tasks");

var TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean, default: false}
}, {timestamps: true})

mongoose.model("Task", TaskSchema);
var Task = mongoose.model("Task")
