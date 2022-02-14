package com.spring.social.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.social.model.Student;

/**
 * The Class TestingController.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin("https://localhost:4200")
public class TestingController {

	/** The students. */
	private List<Student> students = new ArrayList<>();
	
	/**
	 * Inits the students.
	 */
	@PostConstruct
	public void initStudents() {
		students.add(new Student(1l, "saad", "cheddadi"));
		students.add(new Student(2l, "jihane", "cheddadi"));
		students.add(new Student(3l, "nael", "cheddadi"));

	}

	/**
	 * Gets the all students.
	 *
	 * @return the all students
	 */
	@GetMapping("/students")
	public List<Student> getAllStudents() {
		return students;
	}

}
