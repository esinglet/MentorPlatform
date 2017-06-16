$(document).ready(function(){

	$.get("/GetOrgPeople", function(data){

		$('#pTable').DataTable( 
			{
				data:data,
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