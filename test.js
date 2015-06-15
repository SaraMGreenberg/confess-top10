var fs = require('fs');
var system = require('system');
var received = [['Time','Local','External', 'URL']],
	stats = [],
	loadSize = 0,
	t, address, home, pageLoadContent, loadTime;
var pageLoadTest = {

	run: function () {
		if (system.args.length < 3) {
			console.log('Usage: test.js <test URL> <home URL>');
			phantom.exit(1);
		} else {
			address = system.args[1];
			home = system.args[2];

			 if (fs.exists("pageload.csv")){
				 pageLoadContent = fs.read("pageload.csv");
			 }else{
			 	stats = [['Page','Time(ms)','Size(B)']];
			 	pageLoadContent ="";
			 }

			t = Date.now();
			var page = require('webpage').create();
			page.settings.userAgent = 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 5 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.99 Mobile Safari/537.36';
			page.viewportSize = {
			  width: 360,
			  height: 640
			};

			page.onInitialized = function () {
			    page.evaluate(function () {
			        (function () {
			            window.screen = {
			                width: 360,
			                height: 640
			            };
			        })();
			    });
			};

		    page.onResourceRequested = function (req) {
		        //Do something when a resource is requested
		    };

		    page.onResourceReceived = function (res) {
		        res.time = Date.now() - t;
		        if(res.bodySize != undefined){
		        	loadSize = loadSize + res.bodySize;
		        	if(res.url.indexOf(home) > -1){
		        		received.push([res.time,res.bodySize,0,res.url]);
		        	}else{
		        		received.push([res.time,0,res.bodySize,res.url]);
		        	}
		        }
		    };

		    page.open(address, function (status) {
		        if (status !== 'success') {
		            console.log('FAIL to load the address: ' + address);
		            phantom.exit();
		        } else {
		        	console.log('Calculating page load information for ' + address);
	        		var timeout = setTimeout(function() {
			            var performance = page.evaluate(function() {
			                return window.performance;
			            });
			            
			            loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
	        			
	        			stats.push([address, loadTime, loadSize]);

				         pageLoadContent = pageLoadContent + pageLoadTest.convertToCSV(stats);
				         fs.write("pageload.csv", pageLoadContent, 'w');

				         var resourceContent = pageLoadTest.convertToCSV(received);
						 fs.write("resources.csv", resourceContent, 'w');

						page.render('test.jpeg', {format: 'jpeg', quality: '100'});
			            phantom.exit(1);
			        },4000);
		         }

		    });
		}
		return;
	},
	convertToCSV: function(objArray) {
	    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
	    var str = '';

	    for (var i = 0; i < array.length; i++) {
	        var line = '';
	        for (var index in array[i]) {
	            if (line != '') line += ','
	            line += array[i][index];
	        }
	        str += line + '\r\n';
	    }
	    return str;
	},
}


pageLoadTest.run();
