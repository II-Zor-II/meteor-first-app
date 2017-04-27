
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// 1 import ReactiveDict , this is after adding in in the cli using 'meteor add reactive-dict'
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
 
import './task.js'; //import the task.js on api folder
import './body.html';

//2 instantiate new ReactiveDict when body template is created
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  tasks() {
    
   //4 declare variable template instance then check if hideCompleted is checked 
   // , if true, return only those task that are unchecked
   const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }

    //return Tasks.find({}); <- '.find' is a function for accessing collection in Mongo
   //Tasks is an object declared in api/tasks.js that initializes a new Mongo collection
   
   //otherwise, return all tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });  // like the first function, but now sorted from new to oldest
  },
});

Template.body.events({
  'submit .my-first-form'(event) { //.my-first-form is a class assigned to a form in body.html
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
 
    // Clear form
    target.text.value = '';
  },
  //3 add new event handler to ReactiveDict 
  // this handles the event and the instance of the input
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
 
});