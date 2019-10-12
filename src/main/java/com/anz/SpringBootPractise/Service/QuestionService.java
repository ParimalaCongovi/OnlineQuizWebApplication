package com.anz.SpringBootPractise.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anz.SpringBootPractise.Repository.QuestionRepository;
import com.anz.SpringBootPractise.model.Question;

@Service
public class QuestionService {
	
	@Autowired
	private QuestionRepository questionRepository;
	
	//Question List.
	private List<Question> questionList = new ArrayList<>(Arrays.asList( new Question(1,"radio","Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
			"A. (1/3)","B. (1/8)","C. (2/8)","D. (1/16)","b"),
			new Question(2,"radio","The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
					"A. 4 years","B. 8 years","C. 10 years","D. 2 years","a"),
			new Question(3,"checkbox","Choose the words which best express the meaning of Herculean",
					"A.	colossal","B. mighty","C. facile","D. strenuous","a,b,d"),
			new Question(4,"radio","The angle of elevation of a ladder leaning against a wall is 60° and the foot of the ladder is 4.6 m away from the wall. The length of the ladder is:",
					"A. 2.3 m","B. 4.6 m","C. 7.8 m","D. 9.2 m","d"),
			new Question(5,"radio","A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
					"A.	120 metres","B.	180 metres","C.	324 metres","D.	150 metres","d")
			));
	
	/**
	 * Saves the questions list to the database.
	 */
	public void addQuestions()
	{
		questionList.forEach(questionRepository::save);
	}

	/**
	 * Retrieves the question from the database using questionId
	 * @param qno
	 * @return question object
	 */
	public Question getQuestion(String qno) 
	{
		
		return questionRepository.findByQuestionId(Integer.valueOf(qno));
	}
	
	public List<String> getQuestionAnswers()
	{
		List <String> answerList = new ArrayList<>();
		questionList.forEach(q -> answerList.add(q.getAnswer()));
		return answerList;
	}

}
