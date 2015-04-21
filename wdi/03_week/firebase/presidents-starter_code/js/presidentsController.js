	angular
	.module('presidentsApp')
	.controller('PresidentsController', PresidentsController);

PresidentsController.$inject = ['$firebaseArray', '$firebaseObject'];

function PresidentsController($firebaseArray, $firebaseObject){
	var self = this;

	self.presidentsList = getPresidentsList(); // we want function to call
	self.newPresidentName; //bound to input in view
	self.addPresident = addPresident;
	self.deletePresident = deletePresident;
	self.america = getAmericaObject(); // we want function to call therefore we add ()
	self.addState = addState;

	function getAmericaObject(){
		var ref = new Firebase('https://presidents-demo.firebaseio.com/america');
		var america = $firebaseObject(ref);

		// america.name = 'United States of America';
		// america.yearFounded = 1776;
		// america.population = 317000000;
		// america.states = ['Alabama', 'Alaska', 'Arkansas', 'Arizona', 'California'];
		// america.$save();

		america.$loaded(function() {
			console.log('This runs second: ' + america.states);
		});

		console.log('This runs first: ' + america.states);

		return america;
	}

	function getPresidentsList(){
		// var presidents = [
		// 	{name: 'George Washington'},
		// 	{name: 'John Adams'},
		// 	{name: 'Thomas Jefferson'},
		// 	{name: 'James Madison'},
		// 	{name: 'James Monroe'},
		// 	{name: 'John Quincy Adams'},
		// 	{name: 'Andrew Jackson'},
		// 	{name: 'Martin Van Buren'}
		// ];
		
		// use Firebase's constructor function to make reference to our database
		var ref = new Firebase('https://presidents-demo.firebaseio.com/presidents');
		// uses AngularFire library to donwload our data into a local array
		var presidents = $firebaseArray(ref);
		// return a synced Firebase array
		return presidents;
	}

	function addPresident(){
		var newPrez = {name: self.newPresidentName};
		// self.presidentsList.push(newPrez);
		self.presidentsList.$add(newPrez);
		self.newPresidentName = null;
	}

	function addState(){
		self.america.states.push(self.newStateName);
		self.america.$save();
		self.newStateName = null;
	}

	function deletePresident(prez){
		// var index = self.presidentsList.indexOf(prez);
		// self.presidentsList.splice(index, 1);
		self.presidentsList.$remove(prez);
	}

}
