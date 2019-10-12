package com.anz.SpringBootPractise.Repository;

import org.springframework.data.repository.CrudRepository;

import com.anz.SpringBootPractise.model.Student;


public interface StudentRepository extends CrudRepository<Student,Integer> {
	
	/**
	 * Retrieves Student by StudentName
	 * @param name
	 * @return student object
	 */
	public Student findByStudentName(String name);

}
