function MainAssistant(argFromPusher) {}

MainAssistant.prototype = {
	setup: function() {
		Ares.setupSceneAssistant(this);
		this.$.datePicker1.model.date = new Date();
		this.$.timePicker1.model.time = new Date();
		this.controller.modelChanged(this.$.datePicker1.model);
		this.controller.modelChanged(this.$.timePicker1.model);
		this.initAccount();
	},
	cleanup: function() {
		Ares.cleanupSceneAssistant(this);
	},
	button1Tap: function(inSender, event) {
		if (this.calReady && this.$.textField1.model.value) {
			this.copyFieldsToEvent();
			this.$.event1.createEvent();
		}
	},
	copyFieldsToEvent: function() {
		//copy over params from calendar1 to event1
		this.$.event1.accountId = this.$.calendar1.accountId;
		this.$.event1.calendarId = this.$.calendar1.calendarId;
		this.$.event1.subject = this.$.textField1.model.value;
		this.$.event1.startTimestamp = this.calculateDate();
		this.$.event1.endTimestamp = (this.calculateDate() + 5 * 60 * 1000);
	},
	calculateDate: function() {
		var date = this.$.datePicker1.model.date,
			time = this.$.timePicker1.model.time;
		date.setHours(time.getHours());
		date.setMinutes(time.getMinutes());
		return date.getTime();
	},
	initAccount: function() {
		this.db = new Mojo.Depot({
			name: "demo"
		});
		this.db.get("accountId", function(accountId) {
			if (!accountId)
				this.createAccount();
			else 
				this.initCalendar(accountId);
		}.bind(this), this.createAccount.bind(this));
	},
	initCalendar: function(accountId) {
		this.$.calendar1.accountId = accountId;
		this.db.get("calendarId", function(calendarId) {
			if (!calendarId) 
				this.createCalendar();
			else 
				this.populateCalendar(calendarId);
		}.bind(this), this.createCalendar.bind(this));
	},
	populateCalendar: function(calendarId) {
		this.$.calendar1.calendarId = calendarId;
		this.calReady = true;
	},
	createAccount: function() {
		this.$.account1.createAccount();
	},
	handleCreateAccount: function(acctData) {
		this.db.add("accountId", acctData.accountId, this.initCalendar.bind(this, acctData.accountId), function() {
			Mojo.Controller.errorDialog("There was trouble saving an account");
		});
	},
	handleCreateAccountFailure: function() {
		Mojo.Controller.errorDialog("There was trouble creating an account");
	},
	createCalendar: function() {
		this.$.calendar1.createCalendar();
	},
	handleCreateCalendar: function(calData) {
		this.db.add("calendarId", calData.calendarId, this.populateCalendar.bind(this, calData.calendarId), function() {
			Mojo.Controller.errorDialog("There was trouble saving a calendar");
		});
	},
	handleCreateCalendarFailure: function() {
		Mojo.Controller.errorDialog("There was trouble creating a calendar");
	},
	handleCreateEvent: function() {
		this.controller.stageController.getAppController().showBanner({
			messageText: "An event, " + this.$.event1.subject + ", has been added to your " + this.$.calendar1.calendarName + " calendar"
		}, "", "notification");
	},
	handleCreateEventFailure: function() {
		Mojo.Controller.errorDialog("There was trouble creating an event");
	}
};