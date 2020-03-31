import gql from "graphql-tag";

export const GET_STUDENTS = gql`
{
  students{
    id
    firstName
    LastName
  }
}
`;
export const GET_STUDENT=gql`
    query GET_STUDENT($student_id:ID){
    student(where:{id:$student_id}){
        id
        firstName
        LastName
        email
        status
        program{
            id
            name
        }
        enrollments(where:{
            course:{
                enrollments_every:{
                    student:{id:"1111111"}
                }
            }
        }){
            id
            course{
                id
                name
                attendances{
                    time
                }
            }
        }
        
    }
  }
`;
export const CREATE_STUDENT=gql`
    mutation CREATE_STUDENT(
        $id:ID!,$firstName:String!,$lastName:String!,$password:String!,
        $email:String!,$program_id:ID){
        createStudent(data:{
            id:$id
            firstName:$firstName
            LastName:$lastName
            email:$email
            password:$password
            status:"full-time"
            program:{
                connect:{id:$program_id}
            }
        }){
            id
            firstName
            LastName
            email
            program{
                name
            }
        }
    }

`;
export const UPDATE_STUDENT=gql`
    mutation UPDATE_STUDENT(
        $id:ID!,$firstName:String!,$lastName:String!,$password:String!,
        $program_id:ID){
        updateStudent(
            where:{id:$id},
            data:{
                firstName:$firstName
                LastName:$lastName
                password:$password
                status:"full-time"
                program:{
                    connect:{id:$program_id}
                }
            }
        ){
            id
            firstName
            LastName
            email

        }
    }

`;



export const GET_ATTENDANCE=gql`
    subscription GET_ATTENDANCE{
        attendance{
            mutation
            node{
                time
                student{
                    id
                    firstName
                    enrollments{
                        course{
                            attendances{
                                time
                            }
                        }
                    }
                }
            }
        }
    }
  
`;


export const GET_PROGRAMS = gql`
{
  programs(orderBy:name_ASC) {
    id
    name
    courses{
      id
      name
    }
  }
}
`;
export const GET_PROGRAM = gql`
query GET_PROGRAM($id:ID){
  program(where:{id:$id}){
    id
    name
    courses{
      id
      name
    }
  }
}
`;

export const CREATE_PROGRAM=gql`
    mutation CREATE_PROGRAM($id:ID!,$name:String!){
        createProgram(data:{
            id:$id
            name:$name
        }){
            id
            name
        }
    }

`;

export const UPDATE_PROGRAM=gql`
    mutation UPDATE_PROGRAM($id:ID!,$name:String!){
        updateProgram(where:{id:$id},
            data:{name:$name}
        ){
            id
            name
        }
    }

`;




export const CREATE_COURSE=gql`
    mutation CREATE_COURSE($id:ID!,$name:String!,$NOS:Int!,$program_id:ID){
        createCourse(data:{
            id:$id
            name:$name
            numOfStudent:$NOS
            program:{
                connect:{id:$program_id}
            }
        }){
            id
            name
            numOfStudent
            program{
                id
                name
            }
        }
    }

`;
export const GET_COURSES = gql`
  {
    courses {
      id
      name
    }
  }
`;

export const GET_COURSES_BY_PROGRAM_ID = gql`
  query GET_COURSES_BY_PROGRAM_ID($program_id:ID)
  {
    courses(where:{
        program:{
            id:$program_id
        }
    }){
      id
      name
    }
  }
`;

export const GET_COURSE = gql`
  query Get_COURSE($coure_id: ID!) {
    course(where: {id:$coure_id}) {
      id
      name
      numOfStudent
      program{
        name
      }
      enrollments{
        student{
          id
          firstName
          LastName
        }
      }

    }
  }
`;


export const UPDATE_COURSE=gql`
    mutation UPDATE_COURSE($id:ID!,$name:String!){
        updateCourse(where:{id:$id},
            data:{name:$name}
        ){
            id
            name
        }
    }

`;

export const CREATE_ENROLLMENT=gql`
    mutation CREATE_ENROLLMENT($student_id:ID,$course_id:ID){
        createEnrollment(data:{
            student:{
                connect:{
                    id:$student_id
                }
            }
            course:{
                connect:{
                    id:$course_id
                }
            }
        }){
            student{
                id
            }
            course{
                id
            }
        }

    }


`;