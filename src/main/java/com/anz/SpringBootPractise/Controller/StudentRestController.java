package com.anz.SpringBootPractise.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.anz.SpringBootPractise.Service.QuestionService;
import com.anz.SpringBootPractise.Service.StudentService;
import com.anz.SpringBootPractise.model.Question;
import com.anz.SpringBootPractise.model.Response;
import com.anz.SpringBootPractise.model.Student;

@RestController
public class StudentRestController {

	@Autowired
	private QuestionService questionService;
	@Autowired
	private StudentService studentService;
	
	/**
	 * Adds the questions to the database. 
	 * Retrieves the question by the Question Number.
	 * @param qno
	 * @return Response object.
	 */
	@GetMapping(value = "/exam/question/{qno}")
	public Response getResource(@PathVariable String qno) {
		Question question = questionService.getQuestion(qno);
		Response response = new Response("Done",question);
		//System.out.println(questions);
		return response;
	}
	
	@PostMapping(value = "/save")
	public Response saveAnswers(@RequestBody Student student) {
		studentService.saveStudentAnswers(student);
		Response response = new Response("Done",student);
		System.out.println(student);
		return response;
		
	}
	
	
	
	/** 
	 * Updates the student score in the database.
	 * @param name
	 * @param score
	 * @return response object.
	 */
	@GetMapping(value="/student/{name}")
	public Response updateStudent(@PathVariable String name)
	{
		
		String score=studentService.calculateStudentScore(name);
		Student student = studentService.updateStudent(name, score);
		Response response = new Response ("Done",student);
		System.out.println("Hi"+name+score);
		return response;
	}
	
	
	
}