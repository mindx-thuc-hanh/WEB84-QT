import http from 'http'; // es6+ module
// const http = require('http'); // es5 commonjs

const students = [
    {
        name: "Student1",
        class: "QT"
    },
    {
        name: "Student2",
        class: "TC"
    }
]
const lectures = [
    {
        name: "Loc",
        class: "QT"
    },
    {
        name: "Khoa",
        class: "TC"
    }
]

const app = http.createServer((request, response) => {
    // API: endpoints (url, method)
    // REQUEST
    // METHODS: GET, PUT, POST, DELETE
    // UI: mau do la delete(DELETE), mau xanh tao moi(POST), mau vang + hinh cay but edit(PUT), con mat + blue(GET)
    // API: 
    const url = request.url
    const method = request.method
    console.log(method)
    if (url === '/students') {
        // GET, PUT, POST, PUT
        if (method === 'GET') {
            response.end(JSON.stringify(students))
        } else if (method === 'POST') {
            response.end(JSON.stringify([...students, {
                name: "New student",
                class: "MindX"
            }]))
        }
    } else if (url.includes('/lectures')) {

        if (method === 'GET') {
            response.end(JSON.stringify(lectures))
        } else if (method === 'POST') {
            response.end(JSON.stringify([...lectures, {
                name: "New lecture",
                class: "MindX"
            }]))
        } else if (method === 'DELETE') {
            // /lectures/Student1
            const userName = url.split('/')[2]
            const newLectures = lectures.filter(lecture => lecture.name !== userName)
            response.end(JSON.stringify(newLectures))
        }
    } else if (url === '/student/{{student_name}}') {

    } else {
        response.end('404 NOT FOUND')
    }

});

app.listen(8080, () => {
    console.log('Server is running!');
});