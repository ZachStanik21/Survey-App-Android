/*EXPERIENCESAMPLER LICENSE
The MIT License (MIT)
Copyright (c) 2014-2015 Sabrina Thai & Elizabeth Page-Gould
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

/* activate localStorage */
var localStore = window.localStorage;

// These global variables are for the participant's social network members
var networkMembers = [];
var numMembers;

/* surveyQuestion Model (This time, written in "JSON" format to interface more cleanly with Mustache) */
/* This is used to input the questions you would like to ask in your experience sampling questionnaire*/
// The questions are labelled starting with 0 to facilitate their identification in the question logic stage
// Survey questions have been redacted in this public copy of the app
var surveyQuestions = [
            /*0*/
            /*snooze question, where selecting "No" snoozes the app for a predetermined amount of time*/
            /*this is a multiple choice question*/
						{
						"type":"mult1",
						"variableName": "snooze",
						"questionPrompt": "Are you able to take the survey now?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "No"},
							{"label": "Yes"}
							],
						},
						/*1*/
						{
						
						},
						/*2*/
						{
						
						},
						/*3*/                       
						{
						
						},
						/*4*/
						{
						
						},
						/*5*/
						{
						
						},
						/*6*/
						{
						
						},
						/*7*/
						{
						
						},
						/*8*/
						{
						
						},
						/*9*/
						{
						
						},
						/*10*/
						{
						
						},
						/*11*/
						{
						
						},
						/*12*/
						{
						
						},
						/*13*/
						{
						
						},
						/*14*/
						{
						
						},
						/*15*/
						{
						
						},
						/*16*/
						{
						
						},
						/*17*/
						{
						
						},
						/*18*/
						{
						
						},
						/*19*/
						{
						
						},
						/*20*/
						{
						
						},
						/*21*/
						{
						
						},
						/*22*/
						{
						
						/*23*/
						{
						
						},
						/*24*/
						{
						
						},
						/*25*/
						{
						
						},
						/*26*/
						{
						
						},
						/*27*/
						{
						
						},
						/*28*/
						{
						
						},
						/*29*/
						{
						
						},
						/*30*/
						{
						
						},
						/*31*/
						{
						
						},
						/*32*/
						{
						
						},
						/*33*/
						{
						
						},
						/*34*/
						{
						
						},
						/*35*/
						{
						
						},
						/*36*/
						{
						
						},
						/*37*/
						{
						
						},
						/*38*/
						{
						
						},
						/*39*/
						{
						
						},
						/*40*/
						{
						
						},
						/*41*/
						{
						
						},
						/*42*/
						{
						
						},
						/*43*/
						{
						
						},
						/*44*/
						{
						
						},
						/*45*/
						{
						
						},
						/*46*/
						{
						
						},
						/*47*/
						{
						
						},
						/*48*/
						{
						
						},
						/*49*/
						{
						
						},
						/*50*/
						{
						
						},
						/*51*/
						{
						
						},
						/*52*/
						{
						
						},
						/*53*/
						{
						
						},
						/*54*/
						{
						
						},
						/*55*/
						{
						
						},
						/*56*/
						{
						
						},
						/*57*/
						{
						
						},
						/*58*/
						{
						
						},
						/*59*/
						{
						
						},
						/*60*/
						{
						
						},
						/*61*/
						{
						
						},
						/*62*/
						{
						
						},
						/*63*/
						{
						
						},
						/*64*/
						{
						
						},
						/*65*/
						{
						
						},
						/*66*/
						{
						
						},
						/*67*/
						{
						
						},
						/*68*/
						{
						
						},
						/*69*/
						{
						
						},
						/*70*/
						{
						
						},
						/*71*/
						{
						
						},
						/*72*/
						{
						
						},
						/*73*/
						{
						
						},
						/*74*/
						{
						
						},
						/*75*/
						{
						
						},
						/*76*/
						{
						
						},
						/*77*/
						{
						
						},
						/*78*/
						{
						
						},
						/*79*/
						{
						
						},
						/*80*/
						{
						
						},
						/*81*/
						{
					
						},
						/*82*/
						{
						
						}
						];

/*These are the messages that are displayed at the end of the questionnaire*/
var lastPage = [
				/*input your last-page message*/
                {
                message: "End of questionnaire message"
                },
                /*input snooze last-page message*/
                {
                message: "Snooze message"
                },
				// Input message to be shown if participant enters password incorrectly
                {
                message: "Two months not up yet message"
                },
				// Input message to be shown once participant's top locations have been entered properly
                {
                message: "Finished participant setup message"
                },
                ];

/*Questions to set up participant information so app behavior can be customized for each participant*/                
var participantSetup = [
            {
						"type":"text",
						"variableName": "participant_id",
						"questionPrompt": "Please enter your participant ID:"
            },
            {
            "type":"text",
            "variableName": "psswrd",
            "questionPrompt": "Please enter the research password:"
            },
            {
            "type":"text",
            "variableName": "network_members",
            "questionPrompt": "Please enter the members of your social network with commas (no spaces) separating the individual members (e.g., John Doe,Jane Doe,James Smith)."
            },
            {
            "type":"text",
            "variableName": "locations",
            "questionPrompt": "Please enter your top 10 locations in the following format: 'locationName1,latitude1,longitude1;locationName2,latitude2,longitude2'"
            }
            ];

/*Populate the view with data from surveyQuestion model*/
//Making mustache templates
//This line determines the number of questions in your participant setup
//Shout-out to Rebecca Grunberg for this great feature!
var NUMSETUPQS = participantSetup.length;
//This line tells ExperienceSampler which question in surveyQuestions is the snooze question
//If you choose not to use the snooze option, just comment it out
var SNOOZEQ = 0;
//This section of code creates the templates for all the question formats
var questionTmpl = "<p>{{{questionText}}}</p><ul>{{{buttons}}}</ul>";
var questionTextTmpl = "{{{questionPrompt}}}";
var buttonTmpl = "<li><button id='{{id}}' value='{{value}}'>{{label}}</button></li>";
var textTmpl = "<li><textarea cols=50 rows=5 id='{{id}}'></textarea></li><li><button type='submit' value='Enter'>Enter</button></li>";
var numberTmpl = "<li><input type='number' id='{{id}}'></input></li><br/><br/><li></li><li><button type='submit' value='Enter'>Enter</button></li>";
var checkListTmpl =  "<li><input type='checkbox' id='{{id}}' value='{{value}}'>{{label}}</input></li>";
var instructionTmpl = "<li><button id='{{id}}' value = 'Next'>Next</button></li>";
var sliderTmpl = "<li><input type='range' min='{{min}}' max='{{max}}' value='{{value}}' orient=vertical id='{{id}}' oninput='outputUpdate(value)'></input><output for='{{id}}' id='slider'>50</output><script>function outputUpdate(slidervalue){document.querySelector('#slider').value=slidervalue;}</script></li><li><button type='submit' value='Enter'>Enter</button></li>";
var datePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY" data-template="D MMM YYYY" name="date"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var dateAndTimePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY-HH-mm" data-template="D MMM YYYY  HH:mm" name="datetime24"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var timePickerTmpl = "<li><input id ='{{id}}' type='time'></input><br /><br /></li><li><button type='submit' value='Enter'>Enter</button></li>";
var lastPageTmpl = "<h3>{{message}}</h3>";
//This line generates the unique key variable. You will not assign the value here, because you want the value to change
//with each new questionnaire
var uniqueKey;

// This variable used during the question logic stage to determine if a particular phenomenon is present
// and progress to the next appropriate question
var phenomenon;

var app = {
// Application Constructor
initialize: function() {
    this.bindEvents();
},
// Bind Event Listeners
bindEvents: function() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
    document.addEventListener("resume", this.onResume, false);
    document.addEventListener("pause", this.onPause, false);
},
//these functions tell the app what to do at different stages of running
onDeviceReady: function() {
    app.init();
},

onResume: function() {app.sampleParticipant();},

onPause: function() {app.pauseEvents();},

//Beginning our app functions
/* The first function is used to specify how the app should display the various questions. You should note which questions 
should be displayed using which formats before customizing this function*/
renderQuestion: function(question_index) {
  //First load the correct question from the JSON database
	  var question;
    if (question_index <= -1) {question = participantSetup[question_index + NUMSETUPQS];}
    else {question = surveyQuestions[question_index];}
    var questionPrompt = question.questionPrompt;
    question.questionText = Mustache.render(questionTextTmpl, {questionPrompt: questionPrompt});
    //Now populate the view for this question, depending on what the question type is
    //This part of the function will render different question formats depending on the type specified
    //Another shout-out to Rebecca Grunberg for this amazing improvement to ExperienceSampler
    switch (question.type) {
    	case 'mult1': // Rating scales (i.e., small numbers at the top of the screen and larger numbers at the bottom of the screen).
    		question.buttons = "";
        	var label_count = 0;
        	for (var i = question.minResponse; i <= question.maxResponse; i++) {
            	var label = question.labels[label_count++].label;
            	question.buttons += Mustache.render(buttonTmpl, {
                                                id: question.variableName+i,
                                                value: i,
                                                label: label
                                                });
        	}
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
        		app.recordResponse(this, question_index, question.type);
        	});
        	break;
        case 'mult2': // Rating scales (i.e., positive numbers at the top of the screen and negative numbers at the bottom of the screen).
    		question.buttons = "";
            var label_count = 0;
            for (var j = question.maxResponse; j >= question.minResponse; j--) {
                var label = question.labels[label_count++].label;
                if (label.indexOf('NAME') >= 0){
            		label = label.replace("NAME", function replacer() {return name;});
            		}
                question.buttons += Mustache.render(buttonTmpl, {
                                                    id: question.variableName+j,
                                                    value: j,
                                                    label: label
                                                    });
            }
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
        		app.recordResponse(this, question_index, question.type);
        	});
        	break;		
        case 'checklist':  
        	question.buttons = "";
        	var label_count = 0;
        	var checkboxArray = [];
        	for (var i = question.minResponse; i <= question.maxResponse; i++) {
            	var label = question.labels[label_count++].label;
            	if (label.indexOf('NAME') >= 0){
            		label = label.replace("NAME", function replacer() {return name;});
            		}
            	question.buttons += Mustache.render(checkListTmpl, {
                                                	id: question.variableName+i,
                                                	value: i,
                                                	label: label
                                                	});
        	}
        	question.buttons += "<li><button type='submit' value='Enter'>Enter</button></li>";
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click( function(){
                                          checkboxArray.push(question.variableName);
                                          $.each($("input[type=checkbox]:checked"), function(){checkboxArray.push($(this).val());});
                                          app.recordResponse(String(checkboxArray), question_index, question.type);
            });
            break;
        case 'slider':
        	question.buttons = Mustache.render(sliderTmpl, {id: question.variableName+"1"}, {min: question.minResponse}, {max: question.maxResponse}, {value: (question.maxResponse)/2});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var slider = [];
        	$("#question ul li button").click(function(){
        			slider.push(question.variableName);
        			slider.push($("input[type=range]").val());
        			app.recordResponse(String(slider), question_index, question.type);
        	});
        	break;
        case 'instructions':
        	question.buttons = Mustache.render(instructionTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var instruction = [];
        	$("#question ul li button").click(function(){ 
        		instruction.push(question.variableName);
        		instruction.push($(this).val());
        		app.recordResponse(String(instruction), question_index, question.type);
        	});
        	break;
        case 'text': //default to open-ended text
        	question.buttons = Mustache.render(textTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
 				if (app.validateResponse($("textarea"))){
					console.log("waiting for response");
        		 	app.recordResponse($("textarea"), question_index, question.type);
                 }
                 else {
                     alert("Please enter something.");
                 }
            });
            break;        
	    case 'number': //default to open-ended text
        	question.buttons = Mustache.render(numberTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
				if (app.validateNumber($("input"))){
        		 	app.recordResponse($("input"), question_index, question.type);
                } 
                else {
                    alert("Please enter a number.");
                }
            });
            break; 
        case 'datePicker':
        	question.buttons = Mustache.render(datePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var date, dateSplit, variableName = [], dateArray = [];
        	$("#question ul li button").click(function(){
        		date = $("input").combodate('getValue');
        		dateArray.push(question.variableName);
        		dateArray.push(date);
        		app.recordResponse(String(dateArray), question_index, question.type);
        	});
        	break;    
        case 'dateAndTimePicker':
        	question.buttons = Mustache.render(dateAndTimePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var date, dateSplit, variableName = [], dateArray = [];
        	$("#question ul li button").click(function(){
        		date = $("input").combodate('getValue');
        		dateArray.push(question.variableName);
        		dateArray.push(date);
        		app.recordResponse(String(dateArray), question_index, question.type);
        	});
        	break;
        case 'timePicker':
        	question.buttons = Mustache.render(timePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var time, timeSplit, variableName = [], timeArray = [];
        	$("#question ul li button").click(function(){
				if (app.validateTime($("input"))){
        		 	app.recordResponse($("input"), question_index, question.type);
                } 
                else {
                    alert("Please enter a time.");
                }
        	});
        	break;	        		                 
        }
},

// Saves data and displays appropriate end message
renderLastPage: function(pageData, question_index) {
    $("#question").html(Mustache.render(lastPageTmpl, pageData));
    if ( question_index == SNOOZEQ ) {
        localStore.snoozed = 1;
        app.saveData();        
    }
    else if ( question_index == -1) {
    	app.saveDataLastPage();
    }
    else {
    	var datestamp = new Date();
    	var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds(), milliseconds=datestamp.getMilliseconds();
    	localStore[uniqueKey + '.' + "completed" + "_" + "completedSurvey"  + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds  + "_" + milliseconds] = 1;	
    	app.saveDataLastPage();
    }
},

/* Initialize the whole thing */
init: function() {
	//First, we assign a value to the unique key when we initialize ExperienceSampler
	uniqueKey = new Date().getTime();
	// If localStore.network_members exists, then networkMembers and numMembers should be initialized appropriately
	if(localStore.network_members) {
		app.setMembers();
	}
	//The statement below states that if there is no participant id or if the participant id is left blank,
	//ExperienceSampler would present the participant set up questions
	if (localStore.participant_id === " " || !localStore.participant_id || localStore.participant_id == "undefined") {app.renderQuestion(-NUMSETUPQS);}
	// If psswrd_entered doesn't exist or is 0, present the question prompting the participant for the password
	else if(!localStore.psswrd_entered || localStore.psswrd_entered == 0 || localStore.participant_id == "undefined") {app.renderQuestion((-NUMSETUPQS)+1);}
	//otherwise ExperienceSampler should just save the unique key and display the first question in survey questions  
	else {
    	uniqueKey = new Date().getTime();
		localStore.uniqueKey = uniqueKey;
    	var startTime = new Date(uniqueKey);
    	var syear = startTime.getFullYear(), smonth = startTime.getMonth(), sday=startTime.getDate(), shours=startTime.getHours(), sminutes=startTime.getMinutes(), sseconds=startTime.getSeconds(), smilliseconds=startTime.getMilliseconds();
    	localStore[uniqueKey + "_" + "startTime"  + "_" + syear + "_" + smonth + "_" + sday + "_" + shours + "_" + sminutes + "_" + sseconds + "_" + smilliseconds] = 1;	   		
		app.renderQuestion(0);
    }
	localStore.snoozed = 0;
},
  
/* Record User Responses */  
recordResponse: function(button, count, type) {
		//uncomment up to "localStore[uniqueRecord] = response;" to test whether app is recording and sending data correctly (Stage 2 of Customization)
		//This tells ExperienceSampler how to save data from the various formats
    //Record date (create new date object)
     var datestamp = new Date();
     var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds(), milliseconds=datestamp.getMilliseconds();
     //Record value of text field
     var response, currentQuestion, uniqueRecord;
     if (type == 'text') {
         response = button.val();
         // remove newlines from user input
         response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
         currentQuestion = button.attr('id').slice(0,-1);
     }
     else if (type == 'number') {
         response = button.val();
         // remove newlines from user input
         response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
         currentQuestion = button.attr('id').slice(0,-1);
    }
     else if (type == 'slider') {
     	response = button.split(/,(.+)/)[1];
         currentQuestion = button.split(",",1);
     }
     //Record the array
     else if (type == 'checklist') {
         response = button.split(/,(.+)/)[1];
         currentQuestion = button.split(",",1);
     }
     else if (type == 'instructions') {
     	response = button.split(/,(.+)/)[1];
         currentQuestion = button.split(",",1);
     }
     //Record value of clicked button
     else if (type == 'mult1') {
         response = button.value;
         //Create a unique identifier for this response
         currentQuestion = button.id.slice(0,-1);
     }
     //Record value of clicked button
     else if (type == 'mult2') {
         response = button.value;
         //Create a unique identifier for this response
         currentQuestion = button.id.slice(0,-1);
     }
     else if (type == 'datePicker') {
 		response = button.split(/,(.+)/)[1];
      	currentQuestion = button.split(",",1);
     }
     else if (type == 'dateAndTimePicker') {
 		response = button.split(/,(.+)/)[1];
      	currentQuestion = button.split(",",1);
     }
     else if (type == 'timePicker') {
     	response = button.val();
         currentQuestion = button.attr('id').slice(0,-1);
     }
    if (count <= -1) {uniqueRecord = currentQuestion}
    else {uniqueRecord = uniqueKey + "_" + currentQuestion + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds + "_" + milliseconds;}
     //Save this to local storage
     localStore[uniqueRecord] = response;


  	/*Question Logic Statements*/
		//Stage 3 of Customization
		if(count == (-NUMSETUPQS)) {
			app.setGeolocation();
			console.log("finished setting geolocation");
			$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(count+1);});
		}
		else if (count == ((-NUMSETUPQS)+1)) {
		  if (response == "12345") {
		      localStore.psswrd_entered = 1;
		      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(count+1);});
		  }
		  else {
		      localStore.psswrd_entered = 0;
				app.renderLastPage(lastPage[2], count);
      }
		}
		else if (count == -1) {
		  app.scheduleNotifs();
		  app.setGeofences();
		  app.renderLastPage(lastPage[3], count);
		}
		else if (count == SNOOZEQ) {
		  if (response == 0) {
		      app.renderLastPage(lastPage[1], count);
		  }
		  else if(localStore.notification_type == 1 || response == 1) {
			  $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(81);});
		  }
		  else if(localStore.notification_type == 2){
		      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(82);});
		  }
		}
	  else if (count == 3 && response == 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(5);});
	  }
    else if (count == 5 && response == 0) {
      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(17);});
    }
	  else if (count == 7 && response < 6) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(9);});
	  }
	  else if (count == 10) {
	    phenomenon = response;
	    if(response.indexOf("None of the above") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(16);});
	    }
	    else if(response.indexOf('Anal insertive sex ("top")') >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(11);});
	    }
	    else if(response.indexOf('Anal receptive sex ("bottom")') >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(12);});
	    }
	    else if(response.indexOf("Received oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(13);});
	    }
	    else if(response.indexOf("Gave oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});
	    }
	    else if(response.indexOf("Vaginal sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(15);});
	    }
	    else {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(16);});
	    }
	  }
	  else if (count == 11) {
	    if(phenomenon.indexOf('Anal receptive sex ("bottom")') >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(12);});
	    }
	    else if(phenomenon.indexOf("Received oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(13);});
	    }
	    else if(phenomenon.indexOf("Gave oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});
	    }
	    else if(phenomenon.indexOf("Vaginal sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(15);});
	    }
	    else {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(16);});
	    }
	  }
	  else if (count == 12) {
	    if(phenomenon.indexOf("Received oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(13);});
	    }
	    else if(phenomenon.indexOf("Gave oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});
	    }
	    else if(phenomenon.indexOf("Vaginal sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(15);});
	    }
	    else {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(16);});
	    }
	  }
	  else if (count == 13) {
	    if(phenomenon.indexOf("Gave oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});
	    }
	    else if(phenomenon.indexOf("Vaginal sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(15);});
	    }
	    else {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(16);});
	    }
	  }
	  else if (count == 14) {
	    if(phenomenon.indexOf("Vaginal sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(15);});
	    }
	    else {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(16);});
	    }
	  }
	  else if (count == 17 && response.indexOf("None of the above") >= 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(19);});
	  }
	  else if (count == 19 && response == 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(22);});
	  }
	  else if (count == 22 && response == 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(25);});
	  }
	  else if (count == 25 && response == 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(36);});
	  }
	  else if (count == 26 && response.indexOf("Other") === -1) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(28);});
	  }
	  else if (count == 28 && response.indexOf("Other") === -1) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(30);});
	  }
	  else if (count == 31 && response == 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(33);});
	  }
	  else if (count == 40) {
	    app.renderLastPage(lastPage[0], count);
	  }
	  else if (count == 41 && response == 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(51);});
	  }
	  else if (count == 44) {
	    phenomenon = response;
	    if(response.indexOf("None of the above") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(50);});
	    }
	    else if(response.indexOf('Anal insertive sex ("top")') >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(45);});
	    }
	    else if(response.indexOf('Anal receptive sex ("bottom")') >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(46);});
	    }
	    else if(response.indexOf("Received oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(47);});
	    }
	    else if(response.indexOf("Gave oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(48);});
	    }
	    else if(response.indexOf("Vaginal sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(49);});
	    }
	    else {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(50);});
	    }
	  }
	  else if (count == 45) {
	    if(phenomenon.indexOf('Anal receptive sex ("bottom")') >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(46);});
	    }
	    else if(phenomenon.indexOf("Received oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(47);});
	    }
	    else if(phenomenon.indexOf("Gave oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(48);});
	    }
	    else if(phenomenon.indexOf("Vaginal sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(49);});
	    }
	    else {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(50);});
	    }
	  }
	  else if (count == 46) {
	    if(phenomenon.indexOf("Received oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(47);});
	    }
	    else if(phenomenon.indexOf("Gave oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(48);});
	    }
	    else if(phenomenon.indexOf("Vaginal sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(49);});
	    }
	    else {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(50);});
	    }
	  }
	  else if (count == 47) {
	    if(phenomenon.indexOf("Gave oral sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(48);});
	    }
	    else if(phenomenon.indexOf("Vaginal sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(49);});
	    }
	    else {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(50);});
	    }
	  }
	  else if (count == 48) {
	    if(phenomenon.indexOf("Vaginal sex") >= 0) {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(49);});
	    }
	    else {
	      $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(50);});
	    }
	  }
	  else if (count == 51 && response.indexOf("None of the above") >= 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(53);});
	  }
	  else if (count == 53 && response == 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(56);});
	  }
	  else if (count == 68 && response == 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(73);});
	  }
	  else if (count == 69 && response < 6) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(71);});
	  }
	  else if (count == 71 && response.indexOf("Other") === -1) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(73);});
	  }
	  else if (count == 73 && response == 0) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(76);});
	  }
	  else if (count == 81) {
		  $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(1);});
	  }
	  else if (count == 82) {
		  $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(41);});
	  }
	  else if (count == 80) {
		  app.renderLastPage(lastPage[0], count);
	  }
	  else if (count < surveyQuestions.length-1) {
	    $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(count+1);});
	  }
},

// Parses the String of network members (localStore.network_members) into individual members
// Initializes networkMembers with array of label objects ({"label": "member name"}) and numMembers
// With the number of members' names stored
setMembers: function () {
	var members = localStore.network_members.split(",");
    numMembers = members.length;

    for(var j = 0; j < numMembers; j++) {
        var tmpobj = {"label": members[j]};
        networkMembers.push(tmpobj);
    }
	console.log("numMembers: ", numMembers);
	console.log("members: ", networkMembers);
},

// Activates background geolocation tracking services after the participant enters their participant ID
// Server URL has been redacted in this public copy of the app
setGeolocation: function() {
	// Configuration properties can be changed as desired
	BackgroundGeolocation.configure({
    locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 25,
	debug: true,
    distanceFilter: 25,
	stopOnTerminate: false,
	startOnBoot: true,
	startForeground: true,
    notificationTitle: 'Background Tracking',
    notificationText: 'enabled',
    interval: 3000,
    activitiesInterval: 10000,
    url: '',
    syncUrl: '',
	syncThreshold: 100,
    // Customizable data post properties
    postTemplate: {
      lat: '@latitude',
      lon: '@longitude',
      timeStamp: '@time',
	  partID: localStore.participant_id
    }
  });

  // Actually starts the service, after asking for appropriate permissions from the user
  BackgroundGeolocation.start();
},

// Adds the appropriate geofences using the locations entered 
setGeofences: function() {
	// Stops background geolocation services so geofences can be set up
	BackgroundGeolocation.stop();
	// Individual locations
    var locs = localStore.locations.split(";");
    var numLocs = locs.length;
    for(var j = 0; j < numLocs; j++) {
		// info[0] contains the location name, info[1] contains latitude, info[2] contains longitude
        var info = locs[j].split(",");
        var locName = info[0];
        var locLatitude = parseFloat(info[1]);
        var locLongitude = parseFloat(info[2]);
        var locId = j+2;
		// Adds a geofence of radius 20 meters centered at (locLatitude, locLongitude) with the location name included in the notification data
        window.geofence.addOrUpdate({
            id: locName,
            latitude: locLatitude,
            longitude: locLongitude,
            radius: 20,
            transitionType: 2,
            notification: {
                id: locId,
                title: "Location Triggered Survey",
                text: "You just left " + locName,
                smallIcon: String,
                icon: String,
                openAppOnClick: true,
                data: {name: locName}
        }
        }).then(function () {
            console.log('Geofence successfully added');
        }, function (error) {
            console.log('Adding geofence failed', error);
        });
    }

	// When a location triggered notification is clicked on, localStore.loc_name and localStore.notification_type are initialized with appropriate information
    window.geofence.onNotificationClicked = function (notificationData) {
		localStore.loc_name = notificationData.name;
        localStore.notification_type = 2;
        app.init();
    };
},
    
/* Prepare for Resume and Store Data */
/* Time stamps the current moment to determine how to resume */
// Sets localStore.notification_type to 0 so sampleParticipant can determine how to continue
// when the app is resumed
pauseEvents: function() {
    localStore.pause_time = new Date().getTime();
    localStore.uniqueKey = uniqueKey;
	localStore.notification_type = 0;
    app.saveData();
},

// Called whenever participant pauses app then resumes it later
// If the survey was snoozed or localStore.notification_type still contains a nonzero value, generates
// a new unique key and start tag then renders the first question
// Otherwise, loads the existing unique key and continues with current question
sampleParticipant: function() {
    var current_moment = new Date();
    var current_time = current_moment.getTime();

    if (localStore.snoozed == 1 || localStore.notification_type == 1 || localStore.notification_type == 2) {
        uniqueKey = new Date().getTime();
        localStore.snoozed = 0;
    	var startTime = new Date(uniqueKey);
    	var syear = startTime.getFullYear(), smonth = startTime.getMonth(), sday=startTime.getDate(), shours=startTime.getHours(), sminutes=startTime.getMinutes(), sseconds=startTime.getSeconds(), smilliseconds=startTime.getMilliseconds();
    	localStore[uniqueKey + "_" + "startTime"  + "_" + syear + "_" + smonth + "_" + sday + "_" + shours + "_" + sminutes + "_" + sseconds + "_" + smilliseconds] = 1;
		app.renderQuestion(0);
    }
    else if (localStore.notification_type == 0 || localStore.notification_type == "undefined") {
    	  uniqueKey = localStore.uniqueKey;
    }
    app.saveData();
},

// Server URL has been redacted in this public copy of the app
saveDataLastPage:function() {
	console.log("saveDataLastPage called");
	console.log(localStore.participant_id);
	var myData = JSON.stringify(localStore);
     $.ajax({
            type: 'post',
            url: '',
            data: myData,
            crossDomain: true,
			processData: false,
			contentType: false,
            success: function (result) {
            var pid = localStore.participant_id, snoozed = localStore.snoozed, uniqueKey = localStore.uniqueKey, pause_time=localStore.pause_time, psswrd_entered = localStore.psswrd_entered, notType = localStore.notification_type, name = localStore.loc_name;
            localStore.clear();
			var current = new Date();
			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			var day = days[current.getDay()];
			var hour = current.getHours();
			var minute = current.getMinutes();
			var time = hour + ":" + minute;
			console.log(localStore.participant_id);
			localStore.last_time = time;
			localStore.last_day = day;
			localStore.notification_type = notType;
			localStore.loc_name = name;
            localStore.participant_id = pid;
            localStore.snoozed = snoozed;
 		    localStore.uniqueKey = uniqueKey;
 		    localStore.pause_time=pause_time;
            localStore.psswrd_entered = psswrd_entered;
            $("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey.</h3>");
            },

            error: function (request, error) {
 				console.log(error);
                 $("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers (uoft.dailylifestudy@gmail.com).</h3><br><button>Resend data</button>");
                 $("#question button").click(function () {app.saveDataLastPage();});
 				}
            });
},

// Server URL has been redacted in this public copy of the app
saveData:function() {
	console.log("saveData called");
	console.log(localStore.participant_id);
	var myData = JSON.stringify(localStore);
    $.ajax({
            type: 'post',
            url: '',
            data: myData,
            crossDomain: true,
			processData: false,
			contentType: false,
            success: function (result) {
            var pid = localStore.participant_id, snoozed = localStore.snoozed, uniqueKey = localStore.uniqueKey, pause_time = localStore.pause_time, psswrd_entered = localStore.psswrd_entered, notType = localStore.notification_type, name = localStore.loc_name;
            localStore.clear();
			var current = new Date();
			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			var day = days[current.getDay()];
			var hour = current.getHours();
			var minute = current.getMinutes();
			var time = hour + ":" + minute;
			localStore.last_time = time;
			localStore.last_day = day;
			localStore.notification_type = notType;
			localStore.loc_name = name;
            localStore.participant_id = pid;
            localStore.snoozed = snoozed;
 			localStore.uniqueKey = uniqueKey;
            localStore.pause_time = pause_time;
            localStore.psswrd_entered = psswrd_entered;
            },
            error: function (request, error) {console.log(error);}
            });
},
    
// Local Notifications Javascript
scheduleNotifs:function(){
    var current = new Date();
    var year = current.getFullYear(), month = current.getMonth(), day = current.getDate();
    var today = new Date(year, month, day, 7, 0, 0, 0);
    var next = new Date(today.getTime() + 86400000);

    cordova.plugins.notification.local.schedule({
        id: 0,
        title: "App Name",
        text: "Time to complete a survey",
        at: next,
        every: "day"
    });

    cordova.plugins.notification.local.on("click", function(notification) {
        localStore.snoozed = 0;
        localStore[notification_type] = 1;
    });
},

//This function forces participants to respond to an open-ended question if they have left it blank
validateResponse: function(data){
        var text = data.val();
        if (text === ""){
        	return false;
        } else { 
        	return true;
        }
    }, 
validateNumber: function(data){
        var num = data.val();
		if (num === "") {
			return false
		}
        else if (isNaN(num)){
        	return false;
        } 
        else { 
        	return true;
        }
    }
};
