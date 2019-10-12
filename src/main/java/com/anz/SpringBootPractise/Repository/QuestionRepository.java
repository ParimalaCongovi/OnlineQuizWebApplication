package com.anz.SpringBootPractise.Repository;


import org.springframework.data.repository.CrudRepository;

import com.anz.SpringBootPractise.model.Question;

public interface QuestionRepository extends CrudRepository<Question,String>{
	
	/**
	 * Retrieves question by QuestionId
	 * @param questionId
	 * @return question object
	 */
	public Question findByQuestionId(Integer questionId);
}
