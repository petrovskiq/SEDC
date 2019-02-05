function Register(firstName, lastName, username, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
};

function Address(address, addressNumber, city, country) {
    this.address = address;
    this.addressNumber = addressNumber;
    this.city = city;
    this.country = country;
};

let allFunc = {
    showHide: function (para1, para2, para3) {
        para1.style.display = "block";
        para2.style.display = "none";
        btn.addressShow.style.display = para3;
    },
    registerSubmit: function (data) {
        let flag = false
        users.forEach(element => {
            if (element.username === data.username) {
                alert("username exists");
                flag = true
            } else if (element.email === data.email) {
                flag = true
                alert("email exists");
            }
        })
        if (!flag) {
            alert("you are registered");
            users.push(data);
            return;
        }
    }
}

let form = {
    register: document.getElementById("registerForm"),
    logIn: document.getElementById("logInForm"),
    address: document.getElementById("addressForm")
};

let btn = {
    addressShow: document.getElementById("btnAddressShow"),
    logInShow: document.getElementById("btnLogInShow"),
    registerShow: document.getElementById("btnRegisterShow"),
    logOut: document.getElementById("btnLogOut")
};

let input = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    username: document.getElementById("username"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    address: document.getElementById("address"),
    addressNumber: document.getElementById("addressNumber"),
    city: document.getElementById("city"),
    country: document.getElementById("country"),
    usernameLogIn: document.getElementById("usernameLogIn"),
    passwordLogIn: document.getElementById("passwordLogIn")
}

form.register.style.display = "none";
form.logIn.style.display = "none";
form.address.style.display = "none"
btn.addressShow.style.display = "none";
btn.logOut.style.display = "none";

let users = [{
        firstName: "Martin",
        lastName: "Petrovski",
        username: "petrovskiq",
        email: "petrovski@gmail.com",
        password: "908060"
    },
    {
        firstName: "Dario",
        lastName: "Kostov",
        username: "kostovq",
        email: "kostov@gmail.com",
        password: "123456"
    },
    {
        firstName: "Petar",
        lastName: "Donevski",
        username: "acc",
        email: "donevski@gmail.com",
        password: "noktieftino"
    }
];

btn.logInShow.addEventListener("click", () => allFunc.showHide(form.logIn, form.register, "none"));

btn.registerShow.addEventListener("click", () => {
    allFunc.showHide(form.register, form.logIn, "block");
    form.address.style.display = "none";
});

btn.addressShow.addEventListener("click", () => form.address.style.display = "block");

form.register.onsubmit = function (e) {
    e.preventDefault();
    let user = new Register(input.firstName.value, input.lastName.value, input.username.value, input.email.value, input.password.value);
    allFunc.registerSubmit(user)
    console.log(users)
}

form.address.onsubmit = function (e) {
    e.preventDefault();
    let address = new Address(input.address.value, input.addressNumber.value, input.city.value, input.country.value)
    Object.assign(users[users.length - 1], address);
    console.log(users)
}

form.logIn.onsubmit = function (e) {
    e.preventDefault();
    let flag = false
    users.forEach(element => {
        if (element.username === input.usernameLogIn.value && element.password === input.passwordLogIn.value) {
            flag = true
            alert("Logged in");
            btn.logOut.style.display = "block";
            btn.logInShow.style.display = "none";
            btn.registerShow.style.display = "none";
            form.logIn.style.display = "none";
        }
    })
    if (!flag) {
        alert("Incorrect login details");
    }
}
