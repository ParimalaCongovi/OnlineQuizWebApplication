var qno,name;
var timeover;
var quesType;
var score=new Array(0, 0, 0, 0, 0);
var flag=[];
var ans=new Array("Unanswered","Unanswered", "Unanswered","Unanswered","Unanswered");
var temp="";
var total_seconds=60*5;
var c_minutes=parseInt(total_seconds/60);
var c_seconds=parseInt(total_seconds%60);
var ques=[];

window.onload=function(){
	
	name=sessionStorage.getItem("name");
	document.getElementById("q_l1").innerText="Welcome "+name;
	que(document.getElementById("1"));
	
}


function randomque(){
	
	var q1;
	var i=0;
	while(i<5)
	{
		q1=Math.floor((Math.random()*5)+1);
		if(i==0)
			ques[i]=q1;
		var count=0;
		for(var j=1;j<=i;j++)
		{
			if(q1!=ques[j-1])
				count=count+1;
		}
		if(count==i){
			ques[i]=q1;
			i++;
		}
	}
	
}

randomque();
	
//Implements the Timer Functionality and sets the Timer to 15 minutes.
function CheckTime()
{
	document.getElementById("quiz-time-left").innerHTML='Time Left: ' + c_minutes + ' : ' + c_seconds;
	if(total_seconds <=0)
	{
		timeover=true;
		setTimeout("Finish()",1);
	}
	else {
		total_seconds=total_seconds-1;
		c_minutes=parseInt(total_seconds/60);
		c_seconds=parseInt(total_seconds%60);
		setTimeout("CheckTime()",1000);
	}
}

setTimeout("CheckTime()",1000);

/**
 * Displays the question when the button is clicked
 * @param button
 */
function que(button)
{
	
    qno=button.id;
	//q1=ques[qno-1];
    
    //Retrieves the question using AJAX.
	$.ajax({
		type : "GET",
		async:false,
		url :"http://localhost:8080/exam/question/"+qno,
		success: function(result){
			if(result.status == "Done"){
				if(result.data.questionType=="radio")
				{
					quesType="radio";
					$("#q_d4").html("<div id='qno'><div id='question'>" + qno + ". " + result.data.question+
					"</div></div><div id='options'><br><input type='radio' id='a' name='option' value='a'>" + result.data.choiceA+
					"<br><input type='radio' id='b' name='option' value='b' >" + result.data.choiceB +
					"<br><input type='radio' id='c' name='option' value='c' >" + result.data.choiceC +
					"<br><input type='radio' id='d' name='option' value='d' >" + result.data.choiceD+"</div>");
					if(ans[qno-1]!="Unanswered")
						document.getElementById(ans[qno-1]).checked=true;
				}
				else
				{
					quesType="checkbox";
					$("#q_d4").html("<div id='qno'><div id='question'>" + qno + ". " + result.data.question+
							"</div></div><div id='options'><br><input type='checkbox' id='a' name='checkoption' value='a'>" + result.data.choiceA+
							"<br><input type='checkbox' id='b' name='checkoption' value='b' >" + result.data.choiceB +
							"<br><input type='checkbox' id='c' name='checkoption' value='c' >" + result.data.choiceC +
							"<br><input type='checkbox' id='d' name='checkoption' value='d' >" + result.data.choiceD +
							"</div>");
					if(ans[qno-1]!="Unanswered")
					{
						var array = ans[qno-1].split(","); 
						for(var i=0; i< array.length; i++)
							document.getElementById(array[i]).checked=true;
					}
						
				}
				console.log("Success: ", result);
			}else{
				$("#q_d4").html("<strong> Hello Error</strong>");
				console.log("Fail: ", result);
			}
		},
		error : function(e) {
			$("#q_d4").html("<strong>Error</strong>");
			console.log("ERROR: ", e);
		}
	});	
	
}


function Save()
{
     var useranswer;
     if(quesType=="radio")
     {
	     var radioValue = $("input[name='option']:checked").val();
	     if(radioValue){
	    	 useranswer=radioValue;
	     }
	     else
	    	 window.alert("Do select one answer");
     }	
     else
     {
    	 var checkValue="";
	     $.each($("input[name='checkoption']:checked"), function(){
	         checkValue+=$(this).val()+",";
	     });
	     checkValue= checkValue.substring(0, checkValue.length - 1)
	     //window.alert(checkValue);
	     useranswer=checkValue;
	 }
     
     ans[qno-1]=useranswer;
     document.getElementById(qno).style.background="#7fff00";
          
     flag[qno-1]=0;
	 
}
function Marked()
{
     var radioValue = $("input[name='option']:checked").val();
     
     if(radioValue)
    	 document.getElementById(qno).style.background="#ffc300";
     
     ans[qno-1]=radioValue;    
     flag[qno-1]=1;
}
    


function Next()
{
    
    if(qno!=5)
    {
    	qno=parseInt(qno);
    	qno=qno+1;
    }
	   
    else
        qno=1;
	//q1=ques[qno-1];
	//window.alert(qno);
	$.ajax({
		type : "GET",
		async:false,
		url :"http://localhost:8080/exam/question/"+qno,
		success: function(result){
			if(result.status == "Done"){
				if(result.data.questionType=="radio")
				{
					quesType="radio";
					$("#q_d4").html("<div id='qno'><div id='question'>" + qno + ". " + result.data.question+
					"</div></div><div id='options'><br><input type='radio' id='a' name='option' value='a'>" + result.data.choiceA+
					"<br><input type='radio' id='b' name='option' value='b'>" + result.data.choiceB +
					"<br><input type='radio' id='c' name='option' value='c'>" + result.data.choiceC +
					"<br><input type='radio' id='d' name='option' value='d'>" + result.data.choiceD +
					"</div>");
					if(ans[qno-1]!="Unanswered")
						document.getElementById(ans[qno-1]).checked=true;
					//Checks if the previous question is unanswered.
					
 					if(qno!=1 && ans[qno-2]=="Unanswered") 
								document.getElementById(qno-1).style.background="red";	
					
					//Checks if the question number is 1 and 5th question is unanswered and changes the background color of 5th question.
					else if(qno==1 && ans[4]=="Unanswered")
					{
						document.getElementById(5).style.background="red";
					}
				}
				else
				{
					quesType="checkbox";
					$("#q_d4").html("<div id='qno'><div id='question'>" + qno + ". " + result.data.question+
							"</div></div><div id='options'><br><input type='checkbox' id='a' name='checkoption' value='a'>" + result.data.choiceA+
							"<br><input type='checkbox' id='b' name='checkoption' value='b' >" + result.data.choiceB +
							"<br><input type='checkbox' id='c' name='checkoption' value='c' >" + result.data.choiceC +
							"<br><input type='checkbox' id='d' name='checkoption' value='d' >" + result.data.choiceD +
							"</div>");
					if(ans[qno-1]!="Unanswered")
					{
						var array = ans[qno-1].split(","); 
						for(var i=0; i< array.length; i++)
							document.getElementById(array[i]).checked=true;
					}
					if(qno!=1 && ans[qno-2]=="Unanswered")
							document.getElementById(qno-1).style.background="red";	
					else if(qno==1 && ans[4]=="Unanswered")
						document.getElementById(5).style.background="red";
						
				}
					
				console.log("Success: ", result);
			}else{
				$("#q_d4").html("<strong> Hello Error</strong>");
				console.log("Fail: ", result);
			}
		},
		error : function(e) {
			$("#q_d4").html("<strong>Error</strong>");
			console.log("ERROR: ", e);
		}
	});	
    
                
}

function Previous(){
        
    if(qno!=1)
    {
    	qno=parseInt(qno);
	   qno=qno-1;
    }
    else
        window.alert("You are in the first question..");
       // q1=ques[qno-1];   
        $.ajax({
    		type : "GET",
    		async:false,
    		url :"http://localhost:8080/exam/question/"+qno,
    		success: function(result){
    			if(result.status == "Done"){
    				if(result.data.questionType=="radio")
    				{
    					quesType="radio";
	    				$("#q_d4").html("<div id='qno'><div id='question'>" + qno + ". " + result.data.question+
	    				"</div></div><div id='options'><br><input type='radio' id='a' name='option' value='a'>" + result.data.choiceA+
	    				"<br><input type='radio' id='b' name='option' value='b'>" + result.data.choiceB +
	    				"<br><input type='radio' id='c' name='option' value='c'>" + result.data.choiceC +
	    				"<br><input type='radio' id='d' name='option' value='d'>" + result.data.choiceD +
	    				"</div>");
	    				if(ans[qno-1]!="Unanswered")
	    					document.getElementById(ans[qno-1]).checked=true;
    				}
    				else
    				{
    					quesType="checkbox";
    					$("#q_d4").html("<div id='qno'><div id='question'>" + qno + ". " + result.data.question+
    							"</div></div><div id='options'><br><input type='checkbox' id='a' name='checkoption' value='a'>" + result.data.choiceA+
    							"<br><input type='checkbox' id='b' name='checkoption' value='b' >" + result.data.choiceB +
    							"<br><input type='checkbox' id='c' name='checkoption' value='c' >" + result.data.choiceC +
    							"<br><input type='checkbox' id='d' name='checkoption' value='d' >" + result.data.choiceD +
    							"</div>");
    					if(ans[qno-1]!="Unanswered")
    					{
    						var array = ans[qno-1].split(","); 
    						for(var i=0; i< array.length; i++)
    							document.getElementById(array[i]).checked=true;
    					}	
    				}
    				console.log("Success: ", result);
    			}else{
    				$("#q_d4").html("<strong> Hello Error</strong>");
    				console.log("Fail: ", result);
    			}
    		},
    		error : function(e) {
    			$("#q_d4").html("<strong>Error</strong>");
    			console.log("ERROR: ", e);
    		}
    	});	
        
                    
}

function Finish()
{
    var review=0;
    var attempt=0;
    
    for(i=0;i<flag.length;i++)
    {
            if(flag[i]==0)
            	 attempt=attempt+1;
            else if(flag[i]==1)
            {
            	 review=review+1;
            }
     }
	attempt=attempt+review;
    window.opener.sessionStorage.setItem("attempt",attempt);
    //alert("attempt "+attempt);
    //alert(sessionStorage.getItem("attempt"));
    
    var formData = {
      		 studentName: name,
      		 studentAnswers: ans 
       	}
       	
       	// DO POST
       	$.ajax({
   			type : "POST",
   			async:false,
   			contentType : "application/json",
   			url : "http://localhost:8080/save",
   			data : JSON.stringify(formData),
   			dataType : 'json',
   			success : function(result) {
   				if(result.status=="Done")
   				{
   					//alert("Success!")
   					console.log(result);
	   				 if(!timeover)
	   			    {
	   				    if(confirm("No of questions answered: "+attempt+"\nAre you sure you want to submit the test?"))
	   				    {
	   				    	window.opener.location.href = 'http://localhost:8080/final';
	   				        window.close();
	   				    }
	   			    }
	   			    else
	   			    {
	   			    	window.opener.location.href = 'http://localhost:8080/final';
	   			        window.close();
	   			    }
   				}
   			},
   			
   			error : function(e) {
   				console.log("ERROR: ", e);
   				alert("Error!");
   				
   			}
   		});
    
  
    	
}
