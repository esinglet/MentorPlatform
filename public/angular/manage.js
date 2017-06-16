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
});