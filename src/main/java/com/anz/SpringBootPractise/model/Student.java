package com.anz.SpringBootPractise.model;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Student {
	
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer studentId;
	private String studentName;
	private String studentPassword;
	private String studentEmail;
	@ElementCollection
	private List <String> studentAnswers;
	private String studentScore;
	
	//Default Constructor
	public Student() 
	{
		
	}
	
	//Parameterized Constructor.
	public Student(Integer studentId, String studentName, String studentPassword, String studentEmail) 
	{
		super();
		this.studentId = studentId;
		this.studentName = studentName;
		this.studentPassword = studentPassword;
		this.studentEmail = studentEmail;
	}

	@Override
	public String toString() {
		return "Student [studentId=" + studentId + ", studentName=" + studentName + ", studentPassword="
				+ studentPassword + ", studentEmail=" + studentEmail + ", studentAnswers=" + studentAnswers
				+ ", studentScore=" + studentScore + "]";
	}
		
}
