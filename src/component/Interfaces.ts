import React, { Component } from 'react'


export interface ProgramType {
    id: string;
    name: string;
    courses: CourseType[];
    faculties: FacultyType[];
    students: string[];   
}

export interface CourseType{
    id: string;
    name: string;
    numOfStudent: number;
    program: ProgramType;
    enrollments: EnrollmentType[];
    instructings:InstructingType[];
    attendances:Array<AttendanceType>;// same with Attendance[]
}

export interface StudentType{
    id: string
    firstName: string
    LastName: string
    email: string
    password: string
    status: string
    program: ProgramType
    enrollments: EnrollmentType[]
    attendances: AttendanceType[]
}

export interface FacultyType{
    id: string
    firstName: string
    LastName: string
    email: string
    password: string
    status: string
    program: ProgramType
    instructings: InstructingType[]
}

export interface EnrollmentType{
    id: string
    course: CourseType
    student: StudentType
}

export interface InstructingType{
    id: string
    course: CourseType
    faculty: FacultyType
}

export interface AttendanceType{
    id: string
    course: CourseType
    student: StudentType
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