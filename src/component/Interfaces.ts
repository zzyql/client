import React, { Component } from 'react'


export interface Program {
    id: string;
    name: string;
    courses: number;
    faculties: string;
    students: number;   
}

export interface Course{
    id: string;
    name: string;
    numOfStudent: number;
    program: Program;
    enrollments: Enrollment[];
    instructings:Instructing[];
    attendacne:Array<Attendance>;// same with Attendance[]
}

export interface Student{
    id: string
    firstName: string
    LastName: string
    email: string
    password: string
    status: string
    program: Program
    enrollments: Enrollment[]
    attendances: Attendance[]
}

export interface Faculty{
    id: string
    firstName: string
    LastName: string
    email: string
    password: string
    status: string
    program: Program
    instructings: Instructing[]
}

export interface Enrollment{
    id: string
    course: Course
    student: Student
}

export interface Instructing{
    id: string
    course: Course
    faculty: Faculty
}

export interface Attendance{
    id: string
    course: Course
    student: Student
    time: string
}

export const type = {
    program: "Program",
    course: "Course",
    student: "Student",
    faculty: "Faculty",
    enrollment: "Enrollment",
    instructing: "Instructing",
    attendance: "Attendance",
}