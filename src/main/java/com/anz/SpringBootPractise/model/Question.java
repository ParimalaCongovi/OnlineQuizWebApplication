package com.anz.SpringBootPractise.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Question {
	
	@Id
	private Integer questionId;
	private String questionType;
	private String question;
	private String choiceA;
	private String choiceB;
	private String choiceC;
	private String choiceD;
	private String answer;

	//Default Constructor
	public Question()
	{
		
	}

	//Parameterized Constructor.
	public Question(Integer questionId, String questionType, String question, String choiceA, String choiceB, String choiceC,String choiceD, String answer) 
	{
		super();
		this.questionId = questionId;
		this.questionType=questionType;
		this.question = question;
		this.choiceA = choiceA;
		this.choiceB = choiceB;
		this.choiceC = choiceC;
		this.choiceD = choiceD;
		this.answer = answer;
	}

	@Override
	public String toString() {
		return "Question [questionId=" + questionId + ", questionType=" + questionType + ", question=" + question
				+ ", choiceA=" + choiceA + ", choiceB=" + choiceB + ", choiceC=" + choiceC + ", choiceD=" + choiceD
				+ ", answer=" + answer + "]";
	}

	
	
}
