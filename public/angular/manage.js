$(document).ready(function(){

	$.get("/GetOrgPeople", function(data){

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
		console.log(data);
	});
});