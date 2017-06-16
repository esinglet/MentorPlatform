$(document).ready(function () {


	$('#pTable').DataTable(
		{
			ajax: {
				url: "/GetOrgPeople",
				type: "GET"
			},
			columns: [
				{ "data": "personid" },
				{ "data": "fname" },
				{ "data": "lname" },
				{ "data": "email" },
				{ "data": "role" },
				{ "data": "active" }
			]
		}
	);

	var table = $("#rTable").DataTable(
		{
			ajax: {
				url: "/GetOrgRelationships",
				type: "GET",
				dataSrc: ''
			},
			//NEXT STEP: https://datatables.net/examples/api/row_details.html 
			columns: [
				{
					"className": 'details-control',
					"orderable": false,
					"data": null,
					"defaultContent":''
				},
				{ "data": "relid" },
				{ "data": "fname" },
				{ "data": "menteefname" },
			],
			"order": [[1, 'asc']]
		}
	);

	$('#rTable tbody').on('click', 'td.details-control', function () {
		var tr = $(this).closest('tr');
		var row = table.row(tr);

		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(format(row.data())).show();
			tr.addClass('shown');
		}
	});

	// { name:'relid', width:100, enableCellEdit: false },
	// { name:'mentor', width:100, enableCellEdit: true },
	// { name:'mentee', width:100, enableCellEdit: true },
	// { name:'date_created', width:100, enableCellEdit: true },
	// { name:'rate', width:100, enableCellEdit: true },
	// { name:'date_start', width:100, enableCellEdit: true },
	// { name:'date_met', width:100, enableCellEdit: true },

	// { name:'email_count', width:100, enableCellEdit: false },
	// { name:'personid', width:100, enableCellEdit: true },
	// { name:'fname', width:100, enableCellEdit: true },
	// { name:'lname', width:100, enableCellEdit: true },
	// { name:'email', width:100, enableCellEdit: true },
	// { name:'role', width:100, enableCellEdit: true },
	// { name:'org', width:100, enableCellEdit: true },
	// { name:'active', width:100, enableCellEdit: false },

	// { name:'admin', width:100, enableCellEdit: true },
	// { name:'menteeid', width:100, enableCellEdit: true },
	// { name:'menteefname', width:100, enableCellEdit: true },
	// { name:'menteelname', width:100, enableCellEdit: true },
	// { name:'menteeemail', width:100, enableCellEdit: true },
	// { name:'menteerole', width:100, enableCellEdit: true },

	// { name:'menteeorg', width:100, enableCellEdit: true },
	// { name:'menteeactive', width:100, enableCellEdit: true },
	// { name:'menteeadmin', width:100, enableCellEdit: true }


	function format(d) {
		// `d` is the original data object for the row
		return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
			'<tr>' +
			'<td>Full name:</td>' +
			'<td>' + d.name + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Extension number:</td>' +
			'<td>' + d.extn + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Extra info:</td>' +
			'<td>And any further details here (images etc)...</td>' +
			'</tr>' +
			'</table>';
	}

	// Add event listener for opening and closing details

});