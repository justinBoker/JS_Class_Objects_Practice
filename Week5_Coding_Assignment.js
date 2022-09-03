class Teacher {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
        this.students = [];
    }
}
// Class templete for all Teacher objects. Has three properties: name, subject, and an empty array in which the addStudent() method will push student objects into.
class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
}
// Class templete for all Student objects.
class Menu {
    constructor() {
        this.teachers = [];
        this.selectedTeacher = null;
    }
// Properties of the class Menu. It includes an empty array that the createTeacher() method will push teacher objects into. Also, the this.selectedTeacher is set to null,
    // so that we can changed it later to represent a specific teacher when we use the viewTeacher() method.
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
// This start() is what runs the Main Menu, and when the user inputs one of the numbers, it calls the function listed.
    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create New Teacher
        2) View Teacher
        3) Delete Teacher`
        );
    }
// This is what the user sees on their end when you use the start() method.
    createTeacher() {
        let name = prompt('Enter name for new teacher:');
        let subject = prompt('Enter the subject that this teacher teaches:');
        this.teachers.push(new Teacher(name, subject));
    }
// This method creates an instance of a teacher and pushes the new instance into the empty teachers array above.
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
// Use the index to select a specific teacher. The selectedTeacher property changes from null to whatever the index is. Then, the user is taken to the View Teacher submenu. 
    // Here the user sees a description of the teacher and two additional options: Add Student and Remove Student. 
    showTeacherMenuOptions(teacherInfo) {
        return prompt(`
        0) Back
        1) Add Student
        2) Remove Student
        -----------------------------------
        ${teacherInfo}
        `);
    }
// This is what the user sees on their end when they arrive at the View Teacher submenu.
    addStudent() {
        let name = prompt('Enter name for the new student:');
        let grade = prompt("Enter the student's current grade (0-100):");
        if(grade >= 0 && grade <= 100) {
            this.selectedTeacher.students.push(new Student(name, grade));
        } else {
            throw new Error(`You can only add a grade that is between 0-100.`);
        }  
    }
// Add Student method asks the user for the name and the grade of the student. The grade needs to be between 0-100. There is an if conditional built to verify that
    // the user provided correct information. If it is correct, the student object is adding to the empty student array for the selected teacher object. If not, the program
    // throse an error in the console.
    removeStudent() {
        let index = prompt('Enter the index of the student you wish to delete:');
        if(index > -1 && index < this.selectedTeacher.students.length) {
            this.selectedTeacher.students.splice(index, 1);
        }
    }
// Remove student uses the index for the user to select a student to remove. If the condition is met, the student will be removed. If not, nothing happens.
    deleteTeacher() {
        let index = prompt('Enter the index of the teacher you wish to delete:');
        if(index > -1 && index < this.teachers.length) {
            this.teachers.splice(index, 1);
        }
    }
}
// Delete teacher works the same as the Remove Student method.
let menu = new Menu();
menu.start();
// Create a variable menu and set it equal to an instance of Menu. Then call the start() to begin the app.