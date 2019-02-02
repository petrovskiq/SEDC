$(document).ready(function () {


    let serviceObject = {

        studentDatabase: [],

        register: function (student) {
            
            let exists = false;
            for (let el of this.studentDatabase) {
                if (el.firstName === student.firstName) {
                    exists = true;
                }
            }
            if(exists === false){
                this.studentDatabase.push(student);
            }
            
        },
        getStudentsByName: function (name) {
            for (let el of this.studentDatabase) {
                if(name === el.firstName){
                    console.log(el)
                }
            }
        },
        insertStudentAddress: function () {

        }

    }



    function Student(firstName, lastName, userName, password) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;

    }

    function Address(country, city, streetName, streetNumber){
        this.country = country;
        this.city = city;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
    }

    let student = new Student("Martin", "Petrovski", "petrovskiq", "mp210594")
    let student2 = new Student("Dario", "Kostov", "kostov", "blabla")

    serviceObject.register(student)
    serviceObject.register(student2)
    serviceObject.getStudentsByName("Martin")
    console.log(serviceObject.studentDatabase)
    serviceObject.register(student2)
    console.log(serviceObject);



})
