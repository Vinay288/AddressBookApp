const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[A-Za-z]{2,}([\s]?[a-zA-Z]{3,})*$');
    if (!nameRegex.test(name)) {
        throw "Name is Incorrect";
    }
    else
        return true;
}