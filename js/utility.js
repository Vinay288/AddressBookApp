let regex = {
    nameRegex: RegExp('^[A-Z]{1}[A-Za-z]{2,}([\\s]?([a-zA-Z]{3,}))*$'),
    addressRegex: RegExp('^[a-zA-Z0-9]{3,}([\\s]?[a-zA-Z0-9]{3,})*$'),
    phoneNumberRegex: RegExp('^[+]?([0-9]{2})?[789]{1}[0-9]{9}$'),
    zipCodeRegex:RegExp('^[0-9]{3}\\s?[0-9]{3}$')
};
const checkName = (name) => {
    if (!regex.nameRegex.test(name)) {
        throw "Name is Incorrect";
    }
    else
        return true;
}

const checkAddress = (address) => {
    if (!regex.addressRegex.test(address)) {
        throw "Address is Incorrect";
    }
    else
        return true;
}

const checkPhoneNumber= (phoneNumber) => {
    if (!regex.phoneNumberRegex.test(phoneNumber)) {
        throw "Phone Number is Incorrect";
    }
    else
        return true;
}

const checkZipCode=(zipCode) =>{
    if(!regex.zipCodeRegex.test(zipCode)){
        throw "Invalid ZipCode"
    }
    else
        return true;
}