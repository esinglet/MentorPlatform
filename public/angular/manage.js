$(document).ready(function(){


		$('#pTable').DataTable( 
			{
				ajax:{
					url:"/GetOrgPeople",
					type:"GET"
				},
				columns:[
					{"data":"personid"},
					{"data":"fname"},
					{"data":"lname"},
					{"data":"email"},
					{"data":"role"},
					{"data":"active"}
				]
			} 
		);

		$("#rTable").DataTable(
			{
				ajax:{
					url:"/GetOrgRelationships",
					type:"GET",
					dataSrc:''
				},
				columns:[
					{"data":"relid"},
					{"data":"fname"},
					{"data":"menteefname"},
				]
			} 
		);

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
});