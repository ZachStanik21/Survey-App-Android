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
						"type":"mult1",
						"variableName": "CAS_DEM1",
						"questionPrompt": "How was your day?",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Very Bad"},
							{"label": "Bad"},
							{"label": "Neutral"},
							{"label": "Good"},
							{"label": "Very Good"}
							],
						},
						/*2*/
						{
						"type":"mult1",
						"variableName": "CAS_DEM2",
						"questionPrompt": "How was your night?",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Very Bad"},
							{"label": "Bad"},
							{"label": "Neutral"},
							{"label": "Good"},
							{"label": "Very Good"}
							],
						},
						/*3*/                       
						{
						"type":"mult2",
						"variableName": "CAS_PREP1",
						"questionPrompt": "Are you currently taking PrEP?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*4*/
						{
						"type":"mult2",
						"variableName": "CAS_PREP2",
						"questionPrompt": "If yes, did you take your pill yesterday?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*5*/
						{
						"type":"mult2",
						"variableName": "CAS_SEX1",
						"questionPrompt": "Since your last survey, did you engage in any sexual activity?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*6*/
						{
						"type":"text",
						"variableName": "CAS_SEX2",
						"questionPrompt": "How many partners did you engage in sexual activity with?",
						},
						/*7*/
						{
						"type":"mult1",
						"variableName": "CAS_SEX3",
						"questionPrompt": "Where did you engage in sexual activity?",
						"minResponse": 1,
						"maxResponse": 6,
						"labels": [
							{"label": "Home"},
							{"label": "Home of sexual partner"},
							{"label": "Bar/Club"},
							{"label": "Car"},
							{"label": "Hotel"},
							{"label": "Other"}
							],
						},
						/*8*/
						{
						"type":"text",
						"variableName": "EXPLAIN_SEX3",
						"questionPrompt": "Where was the other location you engaged in sexual activity?",
						},
						/*9*/
						{
						"type":"checklist",
                        "variableName": "CAS_SEX4",
                        "questionPrompt": "Were any of your partners: (check all that apply)",
                        "minResponse": 1,
						"maxResponse": 8,
						"labels": [
							{"label": "HIV Positive"},
							{"label": "An unknown HIV status"},
							{"label": "Somebody you just met that day"},
							{"label": "An acquaintance"},
							{"label": "A friend"},
							{"label": "Someone you met on a dating app"},
							{"label": "Someone you are in a romantic relationship with"},
							{"label": "None of the above"}
							],     
						},
						/*10*/
						{
						"type":"checklist",
            "variableName": "CAS_SEX5",
            "questionPrompt": "Did you engage in any of the following sexual activities? (check all that apply)",
            "minResponse": 1,
						"maxResponse": 6,
						"labels": [
							{"label": 'Anal insertive sex ("top")'},
							{"label": 'Anal receptive sex ("bottom")'},
							{"label": "Received oral sex"},
							{"label": "Gave oral sex"},
							{"label": "Vaginal sex"},
							{"label": "None of the above"}
							],     
						},
						/*11*/
						{
						"type":"mult2",
						"variableName": "CAS_SEX5A",
						"questionPrompt": "When you had anal insertive sex, did you have sex without a condom?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*12*/
						{
						"type":"mult2",
						"variableName": "CAS_SEX5B",
						"questionPrompt": "When you had anal receptive sex, did you have sex without a condom?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*13*/
						{
						"type":"mult2",
						"variableName": "CAS_SEX5C",
						"questionPrompt": "When you received oral sex, did you have sex without a condom?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*14*/
						{
						"type":"mult2",
						"variableName": "CAS_SEX5D",
						"questionPrompt": "When you gave oral sex, did you have sex without a condom?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*15*/
						{
						"type":"mult2",
						"variableName": "CAS_SEX5E",
						"questionPrompt": "When you had vaginal sex, did you have sex without a condom?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*16*/
						{
						"type":"mult1",
						"variableName": "CAS_SEX6",
						"questionPrompt": "Thinking about your sexual experience, on a scale from 1-7 would you say it",
						"minResponse": 1,
						"maxResponse": 7,
						"labels": [
							{"label": "Was very bad (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Was very good (high anchor)"}
							],
						},
						/*17*/
						{
						"type":"checklist",
            "variableName": "CAS_HDU1",
            "questionPrompt": "Since your last survey, did you use any of the following substances? (check all that apply)",
            "minResponse": 1,
						"maxResponse": 6,
						"labels": [
							{"label": "Marijuana"},
							{"label": "Cocaine or crack"},
							{"label": "Heroin and other opiates"},
							{"label": "Stimulants or amphetamines sedatives"},
							{"label": "Other drugs"},
							{"label": "None of the above"}
							],
						},
						/*18*/
						{
						"type":"mult1",
						"variableName": "CAS_HDU2",
						"questionPrompt": 'If selected any of the above: How “high” did you get?',
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Not at all high"},
							{"label": "A little high"},
							{"label": "Somewhat high"},
							{"label": "Very high"},
							{"label": "Extremely high"}
							],
						},
						/*19*/
						{
						"type":"mult2",
						"variableName": "CAS_ALC1",
						"questionPrompt": "Did you drink any alcohol?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*20*/
						{
						"type":"text",
						"variableName": "CAS_ALC2",
						"questionPrompt": 'If yes, how many drinks did you consume while at this location? Remember, a “drink” is 12oz of beer, 1.5oz of liquor (a shot), or 5oz of wine',
						},
						/*21*/
						{
						"type":"mult1",
						"variableName": "CAS_ALC3",
						"questionPrompt": 'How “drunk” did you get?',
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Not at all drunk"},
							{"label": "A little drunk"},
							{"label": "Somewhat drunk"},
							{"label": "Very drunk"},
							{"label": "Extremely drunk"}
							],
						},
						/*22*/
						{
						"type":"mult2",
						"variableName": "CAS_SOC1",
						"questionPrompt": "Did you see anyone from your social group today?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*23*/
						{
						"type":"checklist",
            "variableName": "CAS_SOC2",
            "questionPrompt": "Who did you see? (check all that apply)",
            "minResponse": 1,
						"maxResponse": numMembers,
						"labels": networkMembers,
						},
						/*24*/
						{
						"type":"checklist",
            "variableName": "CAS_SOC3",
            "questionPrompt": "While you were with the people listed above, did any of them: (check all that apply)",
            "minResponse": 1,
						"maxResponse": 13,
						"labels": [
							{"label": "Consume alcohol"},
							{"label": "Use drugs"},
							{"label": "Engage in unprotected sexual activity"},
							{"label": "Pick up a partner for sex"},
							{"label": "Use a dating app"},
							{"label": "Encourage you to drink"},
							{"label": "Encourage you to use drugs"},
							{"label": "Encourage you to engage in unprotected sexual activity"},
							{"label": "Support you"},
							{"label": "Get into a verbal disagreement with you"},
							{"label": "Get into a physical fight with you"},
							{"label": "Make you feel safe"},
							{"label": "None of the above"}
							],
						},
						/*25*/
						{
						"type":"mult2",
						"variableName": "CAS_APP1",
						"questionPrompt": "Did you use a dating/partner seeking app today?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*26*/
						{
						"type":"checklist",
            "variableName": "CAS_APP2",
            "questionPrompt": "Which app did you use? (check all that apply)",
            "minResponse": 1,
						"maxResponse": 14,
						"labels": [
							{"label": "Grindr"},
							{"label": "Tinder"},
							{"label": "OKCupid"},
							{"label": "Bumble"},
							{"label": "eHarmony"},
							{"label": "Match.com"},
							{"label": "PlentyofFish"},
							{"label": "Christian Mingle"},
							{"label": "Happn"},
							{"label": "JDate"},
							{"label": "Hinge"},
							{"label": "Down"},
							{"label": "Scruff"},
							{"label": "Other"}
							],
						},
						/*27*/
						{
						"type":"text",
						"variableName": "CAS_APP3",
						"questionPrompt": "If other, which app do you use?",
						},
						/*28*/
						{
						"type":"checklist",
            "variableName": "CAS_APP4",
            "questionPrompt": "What were you using the app for? (check all that apply)",
            "minResponse": 1,
						"maxResponse": 12,
						"labels": [
							{"label": "A sexual partner"},
							{"label": "A date"},
							{"label": "A boyfriend or girlfriend"},
							{"label": "Conversation with a potential partner"},
							{"label": "To communicate with a friend"},
							{"label": "To meet up"},
							{"label": "To have sex"},
							{"label": "Because I was bored"},
							{"label": "Sexting"},
							{"label": "To find drugs"},
							{"label": "To sell drugs"},
							{"label": "Other"}
							],
						},
						/*29*/
						{
						"type":"text",
						"variableName": "CAS_APP_EXPLAIN",
						"questionPrompt": "What other reason did you use the app?",
						},
						/*30*/
						{
						"type":"text",
						"variableName": "CAS_APP5",
						"questionPrompt": "How many people did you interact with?",
						},
						/*31*/
						{
						"type":"mult2",
						"variableName": "CAS_APP6",
						"questionPrompt": "Did you make plans with anyone?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*32*/
						{
						"type":"text",
						"variableName": "CAS_APP7",
						"questionPrompt": "If yes, where will you meet?",
						},
						/*33*/
						{
						"type":"text",
						"variableName": "CAS_APP8",
						"questionPrompt": "How much time do you think you spent on this app yesterday? (# hours)",
						},
						/*34*/
						{
						"type":"text",
						"variableName": "CAS_APP9",
						"questionPrompt": "How many messages did you send? (# messages)",
						},
						/*35*/
						{
						"type":"text",
						"variableName": "CAS_APP10",
						"questionPrompt": "How many messages did you receive? (# messages)",
						},
						/*36*/
						{
						"type":"mult1",
						"variableName": "CAS_MOOD1A",
						"questionPrompt": "Please describe how you currently feel today. How would you rate your mood: Happy",
						"minResponse": 1,
						"maxResponse": 10,
						"labels": [
							{"label": "Not at all happy (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Very happy (high anchor)"}
							],
						},
						/*37*/
						{
						"type":"mult1",
						"variableName": "CAS_MOOD1B",
						"questionPrompt": "Please describe how you currently feel today. How would you rate your mood: Angry",
						"minResponse": 1,
						"maxResponse": 10,
						"labels": [
							{"label": "Not at all angry (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Very angry (high anchor)"}
							],
						},
						/*38*/
						{
						"type":"mult1",
						"variableName": "CAS_MOOD1C",
						"questionPrompt": "Please describe how you currently feel today. How would you rate your mood: Sad",
						"minResponse": 1,
						"maxResponse": 10,
						"labels": [
							{"label": "Not at all sad (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Very sad (high anchor)"}
							],
						},
						/*39*/
						{
						"type":"mult1",
						"variableName": "CAS_MOOD1D",
						"questionPrompt": "Please describe how you currently feel today. How would you rate your mood: Stressed",
						"minResponse": 1,
						"maxResponse": 10,
						"labels": [
							{"label": "Not at all stressed (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Very stressed (high anchor)"}
							],
						},
						/*40*/
						{
						"type":"mult1",
						"variableName": "CAS_MOOD1E",
						"questionPrompt": "Please describe how you currently feel today. How would you rate your mood: Worried",
						"minResponse": 1,
						"maxResponse": 10,
						"labels": [
							{"label": "Not at all worried (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Very worried (high anchor)"}
							],
						},
						/*41*/
						{
						"type":"mult2",
						"variableName": "CAST_SEX1",
						"questionPrompt": "During your time visiting [INSERT LOCATION NAME HERE]: Did you engage in any sexual activity?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*42*/
						{
						"type":"text",
						"variableName": "CAST_SEX2",
						"questionPrompt": "How many partners did you engage in sexual activity with?",
						},
						/*43*/
						{
						"type":"checklist",
            "variableName": "CAST_SEX3",
            "questionPrompt": "Were any of your partners: (check all that apply)",
            "minResponse": 1,
						"maxResponse": 8,
						"labels": [
							{"label": "HIV positive"},
							{"label": "an unknown HIV status"},
							{"label": "somebody you just met that day"},
							{"label": "an acquaintance"},
							{"label": "a friend"},
							{"label": "someone you met on a dating app"},
							{"label": "someone you are in a romantic relationship with"},
							{"label": "None of the above"}
							],
						},
						/*44*/
						{
						"type":"checklist",
            "variableName": "CAST_SEX4",
            "questionPrompt": "Did you engage in any of the following sexual activities? (check all that apply)",
            "minResponse": 1,
						"maxResponse": 6,
						"labels": [
							{"label": 'Anal insertive sex ("top")'},
							{"label": 'Anal receptive sex ("bottom")'},
							{"label": "Received oral sex"},
							{"label": "Gave oral sex"},
							{"label": "Vaginal sex"},
							{"label": "None of the above"}
							],
						},
						/*45*/
						{
						"type":"mult2",
						"variableName": "CAST_SEX4A",
						"questionPrompt": "When you had anal insertive sex, did you have sex without a condom?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*46*/
						{
						"type":"mult2",
						"variableName": "CAST_SEX4B",
						"questionPrompt": "When you had anal receptive sex, did you have sex without a condom?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*47*/
						{
						"type":"mult2",
						"variableName": "CAST_SEX4C",
						"questionPrompt": "When you received oral sex, did you have sex without a condom?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*48*/
						{
						"type":"mult2",
						"variableName": "CAST_SEX4D",
						"questionPrompt": "When you gave oral sex, did you have sex without a condom?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*49*/
						{
						"type":"mult2",
						"variableName": "CAST_SEX4E",
						"questionPrompt": "When you had vaginal sex, did you have sex without a condom?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*50*/
						{
						"type":"mult1",
						"variableName": "CAST_SEX5",
						"questionPrompt": "Thinking about your sexual experience, on a scale from 1-7 would you say it",
						"minResponse": 1,
						"maxResponse": 7,
						"labels": [
							{"label": "Was very bad (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Was very good (high anchor)"}
							],
						},
						/*51*/
						{
						"type":"checklist",
            "variableName": "CAST_HDU1",
            "questionPrompt": "During your time visiting [INSERT LOCATION NAME HERE]: Did you use any of the following substances? (check all that apply)",
            "minResponse": 1,
						"maxResponse": 6,
						"labels": [
							{"label": "Marijuana"},
							{"label": "Cocaine or crack"},
							{"label": "Heroin and other opiates"},
							{"label": "Stimulants or amphetamines sedatives"},
							{"label": "Other drugs"},
							{"label": "None of the above"}
							],
						},
						/*52*/
						{
						"type":"mult1",
						"variableName": "CAST_HDU2",
						"questionPrompt": 'If selected any of the above: How “high” did you get?',
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Not at all high"},
							{"label": "A little high"},
							{"label": "Somewhat high"},
							{"label": "Very high"},
							{"label": "Extremely high"}
							],
						},
						/*53*/
						{
						"type":"mult2",
						"variableName": "CAST_ALC1",
						"questionPrompt": "During your time visiting [INSERT LOCATION NAME HERE]: Did you drink any alcohol?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*54*/
						{
						"type":"text",
						"variableName": "CAS_ALC2",
						"questionPrompt": 'If yes, how many drinks did you consume while at this location? Remember, a “drink” is 12oz of beer, 1.5oz of liquor (a shot), or 5oz of wine: ____drinks',
						},
						/*55*/
						{
						"type":"mult1",
						"variableName": "CAST_ALC3",
						"questionPrompt": 'How “drunk” did you get?',
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Not at all drunk"},
							{"label": "A little drunk"},
							{"label": "Somewhat drunk"},
							{"label": "Very drunk"},
							{"label": "Extremely drunk"}
							],
						},
						/*56*/
						{
						"type":"mult1",
						"variableName": "CAST_LOCDEM1A",
						"questionPrompt": "In describing [INSERT LOCATION HERE], would you say that it was:",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Crowded"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Not crowded"}
							],
						},
						/*57*/
						{
						"type":"mult1",
						"variableName": "CAST_LOCDEM1B",
						"questionPrompt": "In describing [INSERT LOCATION HERE], would you say that it was:",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Dark"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Bright"}
							],
						},
						/*58*/
						{
						"type":"mult1",
						"variableName": "CAST_LOCDEM1C",
						"questionPrompt": "In describing [INSERT LOCATION HERE], would you say that it was:",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Dirty"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Clean"}
							],
						},
						/*59*/
						{
						"type":"mult1",
						"variableName": "CAST_LOCDEM1D",
						"questionPrompt": "In describing [INSERT LOCATION HERE], would you say that it was:",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Pleasant"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Unpleasant"}
							],
						},
						/*60*/
						{
						"type":"mult1",
						"variableName": "CAST_LOCDEM1E",
						"questionPrompt": "In describing [INSERT LOCATION HERE], would you say that it was:",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Loud"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Quiet"}
							],
						},
						/*61*/
						{
						"type":"mult1",
						"variableName": "CAST_LOCDEM1F",
						"questionPrompt": "In describing [INSERT LOCATION HERE], would you say that it was:",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Fun"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Boring"}
							],
						},
						/*62*/
						{
						"type":"mult1",
						"variableName": "CAST_LOCDEM1G",
						"questionPrompt": "In describing [INSERT LOCATION HERE], would you say that it was:",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Safe"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Unsafe"}
							],
						},
						/*63*/
						{
						"type":"mult1",
						"variableName": "CAST_LOCDEM1H",
						"questionPrompt": "In describing [INSERT LOCATION HERE], would you say that it was:",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Familiar"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Unfamiliar"}
							],
						},
						/*64*/
						{
						"type":"mult1",
						"variableName": "CAST_LOCDEM1I",
						"questionPrompt": "In describing [INSERT LOCATION HERE], would you say that it was:",
						"minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "Welcoming"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Unwelcoming"}
							],
						},
						/*65*/
						{
						"type":"checklist",
            "variableName": "CAST_LOCDEM2",
            "questionPrompt": "Individuals at this location were: (select all that apply)",
            "minResponse": 1,
						"maxResponse": 4,
						"labels": [
							{"label": "drinking alcohol"},
							{"label": "using any drugs"},
							{"label": "engaged in sexual activity"},
							{"label": "none of the above"}
							],
						},
						/*66*/
						{
						"type":"text",
						"variableName": "CAST_LOCDEM3",
						"questionPrompt": "What percent of the people there would you guess were men who have sex with men? ____%",
						},
						/*67*/
						{
						"type":"checklist",
            "variableName": "CAST_DISCRIM1",
            "questionPrompt": "While at this location, were you at any point: (select all that apply)",
            "minResponse": 1,
						"maxResponse": 5,
						"labels": [
							{"label": "physically harassed?"},
							{"label": "emotionally harassed"},
							{"label": "sexually harassed"},
							{"label": "experiencing any form of discrimination?"},
							{"label": "none of the above"}
							],
						},
						/*68*/
						{
						"type":"mult2",
						"variableName": "CAST_60M1",
						"questionPrompt": "Did you travel more than 60 miles (about an hour) from your home tonight to get there?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*69*/
						{
						"type":"mult1",
						"variableName": "CAST_60M2",
						"questionPrompt": "How did you travel there?",
						"minResponse": 1,
						"maxResponse": 6,
						"labels": [
							{"label": "Drove yourself"},
							{"label": "Someone drove you"},
							{"label": "Car Service (Uber, Lyft, Taxi)"},
							{"label": "Bus"},
							{"label": "Train"},
							{"label": "Other"}
							],
						},
						/*70*/
						{
						"type":"text",
						"variableName": "CAST_60M2EXPLAIN",
						"questionPrompt": "What other way did you travel there?",
						},
						/*71*/
						{
						"type":"checklist",
            "variableName": "CAST_60M3",
            "questionPrompt": "Why did you travel so far to go there? (check all that apply)",
            "minResponse": 1,
						"maxResponse": 4,
						"labels": [
							{"label": "There is not a place like this near my home"},
							{"label": "The people I wanted to hang out with live near this place"},
							{"label": "No one knows me in this town/city"},
							{"label": "Other"}
							],
						},
						/*72*/
						{
						"type":"text",
						"variableName": "CAST_60M3EXPLAIN",
						"questionPrompt": "What other reason did you travel there?",
						},
						/*73*/
						{
						"type":"mult2",
						"variableName": "CAST_SOC1",
						"questionPrompt": "Did you see anyone from your social group today?",
						"minResponse": 0,
						"maxResponse": 1,
						"labels": [
							{"label": "Yes"},
							{"label": "No"}
							],
						},
						/*74*/
						{
						"type":"checklist",
            "variableName": "CAST_SOC2",
            "questionPrompt": "Who did you see? (check all that apply)",
            "minResponse": 1,
						"maxResponse": numMembers,
						"labels": networkMembers,
						},
						/*75*/
						{
						"type":"checklist",
            "variableName": "CAST_SOC3",
            "questionPrompt": "While you were with the people listed above, did any of them: (check all that apply)",
            "minResponse": 1,
						"maxResponse": 13,
						"labels": [
							{"label": "Consume alcohol"},
							{"label": "Use drugs"},
							{"label": "Engage in unprotected sexual activity"},
							{"label": "Pick up a partner for sex"},
							{"label": "Use a dating app"},
							{"label": "Encourage you to drink"},
							{"label": "Encourage you to use drugs"},
							{"label": "Encourage you to engage in unprotected sexual activity"},
							{"label": "Support you"},
							{"label": "Get into a verbal disagreement with you"},
							{"label": "Get into a physical fight with you"},
							{"label": "Make you feel safe"},
							{"label": "None of the above"}
							],
						},
						/*76*/
						{
						"type":"mult1",
						"variableName": "CAST_MOOD1A",
						"questionPrompt": "Please describe how you currently feel today. How would you rate your mood: Happy",
						"minResponse": 1,
						"maxResponse": 10,
						"labels": [
							{"label": "Not at all happy (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Very happy (high anchor)"}
							],
						},
						/*77*/
						{
						"type":"mult1",
						"variableName": "CAST_MOOD1B",
						"questionPrompt": "Please describe how you currently feel today. How would you rate your mood: Angry",
						"minResponse": 1,
						"maxResponse": 10,
						"labels": [
							{"label": "Not at all angry (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Very angry (high anchor)"}
							],
						},
						/*78*/
						{
						"type":"mult1",
						"variableName": "CAST_MOOD1C",
						"questionPrompt": "Please describe how you currently feel today. How would you rate your mood: Sad",
						"minResponse": 1,
						"maxResponse": 10,
						"labels": [
							{"label": "Not at all sad (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Very Sad (high anchor)"}
							],
						},
						/*79*/
						{
						"type":"mult1",
						"variableName": "CAST_MOOD1D",
						"questionPrompt": "Please describe how you currently feel today. How would you rate your mood: Stressed",
						"minResponse": 1,
						"maxResponse": 10,
						"labels": [
							{"label": "Not at all stressed (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Very stressed (high anchor)"}
							],
						},
						/*80*/
						{
						"type":"mult1",
						"variableName": "CAST_MOOD1E",
						"questionPrompt": "Please describe how you currently feel today. How would you rate your mood: Worried",
						"minResponse": 1,
						"maxResponse": 10,
						"labels": [
							{"label": "Not at all worried (low anchor)"},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": ""},
							{"label": "Very worried (high anchor)"}
							],
						},
						/*81*/
						{
						"type":"instructions",
						"variableName": "CAS_STEM",
						"questionPrompt": "Tell us about what you did since your last survey at " + localStore.last_time + " on " + localStore.last_day
						},
						/*82*/
						{
						"type": "instructions",
						"variableName": "CAST_STEM",
						"questionPrompt": "During your time visiting " + localStore.loc_name + ":"
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
    url: 'https://mvmnt.its.yale.edu/cgi-bin/gps_data_collector.cgi',
    syncUrl: 'https://mvmnt.its.yale.edu/cgi-bin/gps_data_collector.cgi',
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

saveDataLastPage:function() {
	console.log("saveDataLastPage called");
	console.log(localStore.participant_id);
	var myData = JSON.stringify(localStore);
     $.ajax({
            type: 'post',
            url: 'https://mvmnt.its.yale.edu/cgi-bin/data_collector.cgi',
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

saveData:function() {
	console.log("saveData called");
	console.log(localStore.participant_id);
	var myData = JSON.stringify(localStore);
    $.ajax({
            type: 'post',
            url: 'https://mvmnt.its.yale.edu/cgi-bin/data_collector.cgi',
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
