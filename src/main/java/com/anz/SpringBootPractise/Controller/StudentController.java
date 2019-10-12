package com.anz.SpringBootPractise.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.anz.SpringBootPractise.Service.QuestionService;
import com.anz.SpringBootPractise.Service.StudentService;
import com.anz.SpringBootPractise.model.Student;

@Controller
public class StudentController {
	
	@Autowired
	private StudentService studentService;
	@Autowired
	private QuestionService questionService;
	
	//Loaded as the start page of the Web Application. Maps the request to home HTML page.
	@RequestMapping("/student")
	public String welcome(Model model) 
	{
		//session.setAttribute("student", new Student());
		model.addAttribute("student",new Student());
		return "home";
	}
	
	//Adds the student details to the Database and displays Rules of the quiz.
	@RequestMapping(value="/student",method=RequestMethod.POST)
	public String addStudentDetails(@ModelAttribute Student student,Model model) 
	{
		if(studentService.addStudent(student))
		{	
			model.addAttribute("student",student);
			model.addAttribute("name",student.getStudentName());
			return "rules";
		}
		else
		{
			model.addAttribute("studentError",true);
			return "home";
		}
	}
	
	//Maps the request of existing user and sends the login HTML page as a response.
	@RequestMapping(value="/login")
	public String login(Model model) 
	{
		model.addAttribute("student", new Student());
		return "login";
	}
	
	
	//Verifies the credentials of the user and displays Rules on successful login.
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public String loginValidate(@ModelAttribute Student student,Model model) 
	{
		String result=studentService.getStudent(student);
		if(result.equals("Success"))
		{
			model.addAttribute("name",student.getStudentName());
			return "rules";
		}
		else if(result.equals("UserFail"))
		{
			model.addAttribute("UserError",true);
			return "login";
		}
		else
		{
			model.addAttribute("PasswordError",true);
			return "login";
		}
	}
	
	//Maps the request to exam HTML page where the questions are displayed.
	@RequestMapping(value="/start")
	public String start(@ModelAttribute Student student,Model model) 
	{
		questionService.addQuestions();
		model.addAttribute("student",student);
		return "exam";
	}
	
	
	//Maps the request to QuizScore HTML page where the result summary of the user is displayed.
	@RequestMapping(value="/final")
	public String scoreDisplay() 
	{
		return "quizscore";
	}
	
}
