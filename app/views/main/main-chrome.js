opus.Gizmo({
	name: "main",
	dropTarget: true,
	type: "Palm.Mojo.Panel",
	h: "100%",
	styles: {
		zIndex: 2
	},
	components: [
		{
			name: "event1",
			onSuccess: "handleCreateEvent",
			onFailure: "handleCreateEventFailure",
			accountId: "com.thynctank.demo",
			calendarId: "calendar1",
			externalId: "calendar1",
			eventId: "test",
			type: "Palm.Mojo.Event"
		},
		{
			name: "calendar1",
			onSuccess: "handleCreateCalendar",
			onFailure: "handleCreateCalendarFailure",
			accountId: "com.thynctank.demo",
			calendarId: "calendar1",
			externalId: "calendar1",
			calendarName: "Demo Calendar",
			type: "Palm.Mojo.Calendar"
		},
		{
			name: "account1",
			onSuccess: "handleCreateAccount",
			onFailure: "handleCreateAccountFailure",
			accountId: "com.thynctank.demo",
			displayName: "Thynctank Demo",
			dataTypes: [
				"CONTACTS",
				"CALENDAR"
			],
			domain: "com.thynctank",
			icons: {},
			username: "demo",
			type: "Palm.Mojo.Account"
		}
	],
	chrome: [
		{
			name: "group1",
			dropTarget: true,
			type: "Palm.Mojo.Group",
			l: 0,
			t: 171,
			h: "auto",
			controls: [
				{
					name: "row3",
					dropTarget: true,
					rowType: "first",
					type: "Palm.Mojo.Row",
					l: 0,
					t: 0,
					h: "auto",
					controls: [
						{
							name: "datePicker1",
							date: "Mon Mar 22 2010 17:43:18 GMT-0400 (EST)",
							type: "Palm.Mojo.DatePicker",
							l: 0,
							t: 59
						}
					]
				},
				{
					name: "row4",
					dropTarget: true,
					rowType: "middle",
					type: "Palm.Mojo.Row",
					l: 0,
					t: 60,
					h: "auto",
					controls: [
						{
							name: "timePicker1",
							time: "Mon Mar 22 2010 00:00:00 GMT-0400 (EST)",
							type: "Palm.Mojo.TimePicker",
							l: 0,
							t: 0
						}
					]
				},
				{
					name: "row5",
					dropTarget: true,
					rowType: "last",
					isTextField: true,
					type: "Palm.Mojo.Row",
					l: 0,
					t: 172,
					controls: [
						{
							name: "textField1",
							hintText: "Subject",
							type: "Palm.Mojo.TextField",
							l: 0,
							t: 0
						}
					]
				}
			]
		},
		{
			name: "button1",
			ontap: "button1Tap",
			disabled: undefined,
			label: "Add Event",
			type: "Palm.Mojo.Button",
			l: 0,
			t: 120
		}
	]
});