"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var App = (0, express_1.default)();
App.use(express_1.default.json());
var Users = [];
// Create user
App.post('/Users', function (req, res) {
    var _a = req.body, Username = _a.Username, Name = _a.Name;
    var ID = Math.random().toString(36).substr(2, 9);
    var NewUser = { ID: ID, Username: Username, Name: Name };
    Users.push(NewUser);
    res.status(201).json(NewUser);
});
// Get user by ID
App.get('/Users/:ID', function (req, res) {
    var ID = req.params.ID;
    var User = Users.find(function (u) { return u.ID === ID; });
    if (!User) {
        res.status(404).json({ error: 'User not found' });
    }
    else {
        res.json(User);
    }
});
// Get list of users
App.get('/Users', function (req, res) {
    res.json(Users);
});
// Update user by ID
App.put('/Users/:ID', function (req, res) {
    var ID = req.params.ID;
    var _a = req.body, Username = _a.Username, Name = _a.Name;
    var UserIndex = Users.findIndex(function (u) { return u.ID === ID; });
    if (UserIndex === -1) {
        res.status(404).json({ error: 'User not found' });
    }
    else {
        Users[UserIndex] = { ID: ID, Username: Username, Name: Name };
        res.json(Users[UserIndex]);
    }
});
// Delete user by ID
App.delete('/Users/:Id', function (req, res) {
    var ID = req.params.ID;
    var UserIndex = Users.findIndex(function (u) { return u.ID === ID; });
    if (UserIndex === -1) {
        res.status(404).json({ error: 'User not found' });
    }
    else {
        var deletedUser = Users.splice(UserIndex, 1);
        res.json(deletedUser[0]);
    }
});
App.listen(3000, function () {
    console.log('Server is running on port 3000');
});
