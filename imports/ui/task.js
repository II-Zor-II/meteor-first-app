import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.html';
 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() { //handles the even for .delete button, and well
    Tasks.remove(this._id); // remove it from the Tasks.collection
   /*
    In a collection, every inserted document has a unique _id field that can be used to refer to that specific document. 
   */
  },
});