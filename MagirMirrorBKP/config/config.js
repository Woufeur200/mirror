/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 */

console.log("!-- Starting config") 

let config = {
	address: "172.16.206.162", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: [], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "fr",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left",
			config: {
				timeZone: "America/New_York"
			}
		},
		{
			module: "calendar",
			header: "Calendrier",
			position: "top_left",
			config: {
				fetchInterval: 10000,
				calendars: [
					{
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/vfp16qmm0osp2s5tqr251p5a80%40group.calendar.google.com/public/basic.ics"
					},
					{
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/thomasravanet%40gmail.com/public/basic.ics"
					}
				]
			}
		},
		{
			module: 'MMM-Todoist',
			position: 'bottom_left',
			header: 'Ma liste', // Optional
			config: { 
				hideWhenEmpty: false,
				accessToken: '4d977ffc6db945b6cd489c135758b6fc30f067ee',//Todoist token
				maximumEntries: 60,
				updateInterval: 10000, // Update every minute
				fade: false,       
				showProject: false,
				projects: [ 2303657327 ] 
		    }
		},
		// {
		// 	module: 'MMM-Todoist',
		// 	position: 'top_left',
		// 	header: 'MagicMirror', // Optional
		// 	config: { 
		// 		hideWhenEmpty: false,
		// 		accessToken: '4d977ffc6db945b6cd489c135758b6fc30f067ee',
		// 		maximumEntries: 60,
		// 		updateInterval: 10000, // Update every minute
		// 		fade: false,       
		// 		showProject: false,
		// 		projects: [ 2306575719 ]  
		//     }
		// },
		
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				degreeLabel: "true",
				showIndoorTemperature: "true",
				location: "Trois-Rivières",
				locationID: "6169141", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "49362734aa2af66a37b85846788a3a3b"
			}
		},
		{
			module: "weather",
			position: "bottom_right",
			header: "Prévisions Météo",
			config: {
				weatherProvider: "openweathermap",
				type: "daily",
				showPrecipitationAmout: "true",
				location: "Trois-Rivières",
				locationID: "6169141", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "49362734aa2af66a37b85846788a3a3b"
			}
		}, 
		{
			module: 'MMM-CustomModule',
			position: 'top_right',							
			// header: 'Living Room Temperature', 	
			// config: {
			// 	debug:true
			// }
		},
		{
			module: 'compliments',
			position: 'top_center'
		},
		{
			module: "newsfeed",
			position: "bottom_center", 
			config: {
				feeds: [
				  {
					title: "New York Times",
					url: "https://www.nytimes.com/services/xml/rss/nyt/HomePage.xml",
				  },
				],
			  },
		},
		{
			module: "MMM-Dynamic-Modules",
		},
	]
};

console.log("!-- Everything is OK");

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
