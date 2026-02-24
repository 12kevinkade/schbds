const DB_KEY_STUDENTS = 'school_students';
const DB_KEY_FINANCE = 'school_finance';
const DB_KEY_ACADEMICS = 'school_academics';

const Database = {
    // Students
    getStudents: () => {
        const data = localStorage.getItem(DB_KEY_STUDENTS);
        return data ? JSON.parse(data) : [];
    },
    saveStudent: (student) => {
        const students = Database.getStudents();
        if (student.id) {
            const index = students.findIndex(s => s.id === student.id);
            if (index !== -1) students[index] = student;
        } else {
            student.id = Date.now().toString();
            student.enrolledDate = new Date().toLocaleDateString();
            students.push(student);
        }
        localStorage.setItem(DB_KEY_STUDENTS, JSON.stringify(students));
        return student;
    },
    deleteStudent: (id) => {
        let students = Database.getStudents();
        students = students.filter(s => s.id !== id);
        localStorage.setItem(DB_KEY_STUDENTS, JSON.stringify(students));
    },

    // Finance
    getTransactions: () => {
        const data = localStorage.getItem(DB_KEY_FINANCE);
        return data ? JSON.parse(data) : [];
    },
    addTransaction: (transaction) => {
        const transactions = Database.getTransactions();
        transaction.id = Date.now().toString();
        transaction.date = new Date().toLocaleDateString();
        transactions.unshift(transaction);
        localStorage.setItem(DB_KEY_FINANCE, JSON.stringify(transactions));
    },

    // Academics
    getGrades: () => {
        const data = localStorage.getItem(DB_KEY_ACADEMICS);
        return data ? JSON.parse(data) : [];
    },
    saveGrade: (gradeRecord) => {
        const grades = Database.getGrades();
        // Check if record exists for student+term+subject
        const existingIndex = grades.findIndex(g =>
            g.studentId === gradeRecord.studentId &&
            g.term === gradeRecord.term &&
            g.subject === gradeRecord.subject
        );

        if (existingIndex !== -1) {
            grades[existingIndex] = { ...grades[existingIndex], ...gradeRecord };
        } else {
            gradeRecord.id = Date.now().toString();
            grades.push(gradeRecord);
        }
        localStorage.setItem(DB_KEY_ACADEMICS, JSON.stringify(grades));
    }
};

// Helper to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Helper to get student name by ID
const getStudentName = (id) => {
    const student = Database.getStudents().find(s => s.id === id);
    return student ? student.name : 'Unknown';
};
