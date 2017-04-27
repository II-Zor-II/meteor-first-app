import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
/*    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });*/
   Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .delete'() { //handles the even for .delete button, and well
//    Tasks.remove(this._id); // remove it from the Tasks.collection
   Meteor.call('tasks.remove', this._id, !this.checked);
   /*
    In a collection, every inserted document has a unique _id field that can be used to refer to that specific document. 
   */
  },
//  Add event handler to call the setPrivate method
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
});