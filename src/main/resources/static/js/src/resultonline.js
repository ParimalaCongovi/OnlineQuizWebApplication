var userAnswers;
var answer=[];
window.onload=function()
{
	
	var name=sessionStorage.getItem("name");
	
	//Displays the name and score of the user using AJAX.
	$.ajax({
		type : "GET",
		async:false,
		url :"http://localhost:8080/student/"+name,
		success: function(result){
			if(result.status == "Done"){
				userAnswers=result.data.studentAnswers;
				$("#d1").html("ID:  "+result.data.studentId+"<br><br> Name:  "+result.data.studentName+"<br><br>Score: "+result.data.studentScore+"/100");
				console.log("Success: ", result);
			}else{
				$("#d1").html("<strong> Hello Error</strong>");
				console.log("Fail: ", result);
			}
		},
		error : function(e) {
			$("#d1").html("<strong>Error</strong>");
			console.log("ERROR: ", e);
		}
	});	
	
}

//Displays both the actual answer and user answer.
function dispans(button)
{
	var id=button.id;
	 document.getElementById('resultans').innerHTML="Your answer : "+ userAnswers[id-1]+"\n Correct answer : "+answer[id-1];
           
}

//Compares the answer of the user with the actual answer.
function checkans()
{
	for(var i=1;i<=5;i++)
	{
		
		 $.ajax({
		 		type : "GET",
		 		async:false,
		 		ajaxI:i,
		 		url :"http://localhost:8080/exam/question/"+i,
		 		success: function(result){
		 			if(result.status == "Done"){
			    				//answer[i-1]=result.data.answer;
			    				//alert(answer[i-1]);
			    				//alert('Success');
			    				console.log("Success: ", result);
			    				answer[this.ajaxI-1]=result.data.answer;
		 			}else{
		 				$("#resultans").html("<strong> Hello Error</strong>");
		 				console.log("Fail: ", result);
		 			}
		 		},
		 		error : function(e) {
		 			$("#resultans").html("<strong>Error</strong>");
		 			console.log("ERROR: ", e);
		 		}
		 	});	
			
	}
	
	document.getElementById('b1').innerHTML="<button onclick='dispans(this)' class='dispbutn' id='1'>1</button>"+
		"<button onclick='dispans(this)' class='dispbutn' id='2'>2</button>"+
		"<button onclick='dispans(this)' class='dispbutn' id='3'>3</button>"+
		"<button onclick='dispans(this)' class='dispbutn' id='4'>4</button>"+
		"<button onclick='dispans(this)' class='dispbutn' id='5'>5</button>";
	
	for(var i=1; i<=5; i++)
	{
		//alert(userAnswers[i-1]+" "+ answer[i-1])
		//Changes the color of the button to white if the question is unanswered.
		 	if(userAnswers[i-1]=="Unanswered")
				document.getElementById(i).style.background="white";
		  //Changes the color of the button to green if answer is right else red.
			else if(userAnswers[i-1]!=answer[i-1])
				document.getElementById(i).style.background="red";
			else
				document.getElementById(i).style.background="green";
		
	}
}



