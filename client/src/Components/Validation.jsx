function Validation(values) {
    let errors = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    if (values?.name) { //optional if name field present then check otherwise not
        if (values.name === "") {
            errors.name = "Name should not empty"
        }
        else if (values.name.length < 3 || values.name.length > 30) {
            errors.name = "Name must be between 3-30 char"
        }
        else {
            errors.name = ""
        }

    }
    if(values?.designation){
    if (values.designation === "") {
        errors.designation = "designation Required"
    }
    else if (values.designation.length < 3 || values.designation.length > 10) {
        errors.designation = "designation must be between 2-10 char"
    }
    else {
        errors.designation = ""
    }
    }

    if (values.email === "") {
        errors.email = "Email Required"
    }
    //else if (!email_pattern.test(values.email)) {
    //  errors.email = "Invalid Email"
    // }
    else {
        errors.email = ""
    }


    if (values.password === "") {
        errors.password = "Password Required"
    }
    //else if (!password_pattern.test(values.password)) {
    //  errors.password = "1 small and capital char a Number to {8}"
    // }
    else {
        errors.password = ""
    }
    return errors;


}

export default Validation;















