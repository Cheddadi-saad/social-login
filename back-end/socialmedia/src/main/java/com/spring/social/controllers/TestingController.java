package com.spring.social.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.social.model.Student;

@RestController
@RequestMapping("/api")
public class TestingController {

	private List<Student> students = new ArrayList<>();

	@PostConstruct
	public void init() {
		students.add(new Student(1l, "saad", "cheddadi"));
		students.add(new Student(2l, "jihane", "cheddadi"));
		students.add(new Student(3l, "nael", "cheddadi"));

	}

	@GetMapping("/students")
	public List<Student> getAllStudents() {
		return students;
	}

}
