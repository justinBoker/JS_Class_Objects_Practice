class Teacher {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
        this.students = [];
    }
}

class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
}

class Menu {
    constructor() {
        this.teachers = [];
        this.selectedTeacher = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0 ) {
            switch (selection) {
                case '1':
                    this.createTeacher();
                    break;
                case '2':
                    this.viewTeacher();
                    break;
                case '3':
                    this.deleteTeacher();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create New Teacher
        2) View Teacher
        3) Delete Teacher`
        );
    }

    createTeacher() {
        let name = prompt('Enter name for new teacher:');
        let subject = prompt('Enter the subject that this teacher teaches:');
        this.teachers.push(new Teacher(name, subject));
    }

    viewTeacher() {
        let index = prompt('Enter the index of the teacher you wish to view:');
        if (index > -1 && index < this.teachers.length) { 
            this.selectedTeacher = this.teachers[index];
            let description = 'Teacher Name: ' + this.selectedTeacher.name + ' - Subject: ' + this.selectedTeacher.subject + '\n';

            for (let i = 0; i < this.selectedTeacher.students.length; i++) {
                description += i + ') ' + this.selectedTeacher.students[i].name + ' - Grade: ' + this.selectedTeacher.students[i].grade + '\n';
            }
            let selection = this.showTeacherMenuOptions(description);
            switch (selection) {
                case '1':
                    this.addStudent();
                    break;
                case '2':
                    this.removeStudent();
            }
        }
    }

    showTeacherMenuOptions(teacherInfo) {
        return prompt(`
        0) Back
        1) Add Student
        2) Remove Student
        -----------------------------------
        ${teacherInfo}
        `);
    }

    addStudent() {
        let name = prompt('Enter name for the new student:');
        let grade = prompt("Enter the student's current grade (0-100):");
        if(grade >= 0 && grade <= 100) {
            this.selectedTeacher.students.push(new Student(name, grade));
        } else {
            throw new Error(`You can only add a grade that is between 0-100.`);
        }  
    }

    removeStudent() {
        let index = prompt('Enter the index of the student you wish to delete:');
        if(index > -1 && index < this.selectedTeacher.students.length) {
            this.selectedTeacher.students.splice(index, 1);
        }
    }

    deleteTeacher() {
        let index = prompt('Enter the index of the teacher you wish to delete:');
        if(index > -1 && index < this.teachers.length) {
            this.teachers.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();