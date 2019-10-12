
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
<style>

</style>
<link rel="stylesheet" href="webexam.css"> </link>
<title>INSTRUCTIONS</title>
</head>

<body>
<div id="center-div">
	
	<form action="/success.html">
	<h1> INSTRUCTIONS </h1>
	<div id="d1">
	
		1.Total number of questions is 3.<br>
		2.Each question carry 5 marks.<b>No negative marking.</b><br>
		3.Do not refresh the page.<br>
		4.All the Best :)<br>
		<p>${name}</p>
	<!--<c:set var="studentname" value="${param.name}" scope="application" />
    <c:set var="studid" value="${param.studentid}" scope="application" />-->
        <!-- <p><c:out value="${studentname}" /></p> -->
	
	<input type="submit" id ="submit" class="butn" value="Start Test"  ></input>
	</div>
</div>
	</form>