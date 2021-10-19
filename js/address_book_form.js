let addressBookDataObject={};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
    const phoneNumber = document.querySelector('#phoneNumber');
    const PhoneNumberError = document.querySelector('.tel-error');
    phoneNumber.addEventListener('input', function () {
        if (phoneNumber.value.length == 0) {
            PhoneNumberError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).phone = phoneNumber.value;
            PhoneNumberError.textContent = "";
        } catch (e) {
            PhoneNumberError.textContent = e;
        }
    });

    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zip-error');
    zip.addEventListener('input', function () {
        if (zip.value.length == 0) {
            zipError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).zipcode = zip.value;
            zipError.textContent = "";
        } catch (e) {
            zipError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('#address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).address = address.value;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });

});

const save = () => {
    try {
        createAddressBookDataObject();
        createAndUpdateStorage();
    }
    catch (e) {
        console.log(e);
    }
}
const reset=()=>{
    setValue("#name", "");
    setValue("#phoneNumber","");
    setValue("#address","");
    setValue("state","");
    setValue("city","");
    setValue("zip","");
}

const createAddressBookDataObject = () => {
    try {
        addressBookDataObject.id = createNewContactId();
        addressBookDataObject.name = getInputValueById('#name');
        addressBookDataObject.phone = getInputValueById("#phoneNumber");
        addressBookDataObject.address = getInputValueById('#address');
        addressBookDataObject.state = getInputValueById("#state");
        addressBookDataObject.city = getInputValueById("#city");
        addressBookDataObject.zipcode = getInputValueById("#zip");
    } catch (e) {
        console.log(e);
    }
}
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
const createNewContactId = () => {
    let contactID = localStorage.getItem("ContactID");
    contactID = !contactID ? 1 : (parseInt(contactID) + 1).toString();
    localStorage.setItem("ContactID", contactID);
    return contactID;
}
const createAndUpdateStorage = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactsList"));
    if (contactList) {
        contactList.push(addressBookDataObject);
    }
    else {
        contactList = [addressBookDataObject];
    }
    localStorage.setItem("ContactsList", JSON.stringify(contactList));
    alert("updated contact details! total contacts are = " + contactList.length);
}