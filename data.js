const csv = require("csv");
const fs = require("fs");

module.exports = {
	random_facts: [],
	Lukas_Tweets: [],
	Connor_Tweets: [],
	config: JSON.parse(fs.readFileSync("./auth.json", "utf-8")),
	// read in all the data for tweets and random facts
	read_data: function() {

		function wait(ms) {
		    return new Promise(resolve => { 
		        setTimeout(resolve, ms); 
		    }); 
		};

	    wait(0)
	    .then(() => {
	        let obj = csv();
	        obj.from.path("./static/tweets/LukasPrin_tweets.csv").to.array(data => {
	            for (let index = 0; index < data.length; ++index) {
	                this.Lukas_Tweets.push(new this.myCSV(data[index][0], data[index][1], data[index][2]));
	            }
	        });
	        return wait(0);
	    })
	    .then(() => {
	        let obj = csv();
	        obj.from.path("./static/tweets/LiLCBaller23_tweets.csv").to.array(data => {
	            for (let index = 0; index < data.length; ++index) {
	                this.Connor_Tweets.push(new this.myCSV(data[index][0], data[index][1], data[index][2]));    
	            }
	        });
	        return wait(0);
	    })
	    .then(() => {
	        this.random_facts = fs.readFileSync("./static/etc/randomfacts.txt").toString().split('\n');
	        return wait(0);
	    })
	    .catch((error) => {
	    	console.log("reading in data error: " + error);
	    })
	},
	// function used for reading in CSV file
	myCSV: function(id, time, message) {
	    this.fieldOne = id;
	    this.fieldTwo = time;
	    this.fieldThree = message;
	},
	// returns random entry in any data array
	getRandom: function(name) {
		if (name === "lukas") {
			let temp = Math.floor((Math.random() * this.Lukas_Tweets.length));
	        let link = "https://twitter.com/LukasPrin/status/" + this.Lukas_Tweets[temp].fieldOne.substring(1);
	        return link;
	    }
	    else if (name === "connor") {
	    	let temp = Math.floor((Math.random() * this.Connor_Tweets.length));
            let link = "https://twitter.com/LiLCBaller23/status/" + this.Connor_Tweets[temp].fieldOne.substring(1);
            return link;
	    }
	    else if (name === "fact") {
	    	let temp = Math.floor((Math.random() * this.random_facts.length));
            return this.random_facts[temp];
	    }
	}
};