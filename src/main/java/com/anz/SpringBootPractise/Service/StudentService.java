package com.anz.SpringBootPractise.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anz.SpringBootPractise.Repository.StudentRepository;
import com.anz.SpringBootPractise.model.Student;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private QuestionService questionService;
	
	/**
	 * Saves the student to the database.
	 * @param student
	 */
	public boolean addStudent(Student student)
	{
		Student testStudent= studentRepository.findByStudentName(student.getStudentName());
		if(testStudent==null)
		{
			studentRepository.save(student);
			return true;
		}
		else
			return false;
	}
	
	/**
	 * Verifies the user's credentials with the database.
	 * @param student
	 * @return Success on successful verification else Fail.
	 */
	public String getStudent(Student student)
	{
		Student testStudent= studentRepository.findByStudentName(student.getStudentName());
		if(testStudent!=null)
		{
			if(student.getStudentPassword().equals(testStudent.getStudentPassword()))
				return "Success";
			else 
				return "PaawordFail";
		}
		else 
			return "UserFail";
				
	}
	
	/**
	 * Update the student score in the database.
	 * @param name
	 * @param score
	 * @return updated student object.
	 */
	public Student updateStudent(String name,String score)
	{
		Student student = studentRepository.findByStudentName(name);
		student.setStudentScore(score);
		studentRepository.save(student);
		return student;
	}

	public void saveStudentAnswers(Student student) {
		// TODO Auto-generated method stub
		Student updateStudent = studentRepository.findByStudentName(student.getStudentName());
		updateStudent.setStudentAnswers(student.getStudentAnswers());
		studentRepository.save(updateStudent);
		
	}
	
	public String calculateStudentScore(String name)
	{
		Integer score=0;
		Student student = studentRepository.findByStudentName(name);
		System.out.println(student);
		List <String> userAnswerList, answerList;
		userAnswerList = student.getStudentAnswers();
		answerList= questionService.getQuestionAnswers();
		System.out.println(userAnswerList.size()+" "+answerList.size());
		answerList.retainAll(userAnswerList);
		System.out.println(answerList.size());
		score=20*answerList.size();
		return score.toString();
		
	}

}
