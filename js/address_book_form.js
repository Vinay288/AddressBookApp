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

const createAddressBookDataObject = () => {
    let addressBookDataObject = new AddressBookData();
    try {
        addressBookDataObject._id = createNewContactId();
        addressBookDataObject._name = getInputValueById('#name');
        addressBookDataObject._phone = getInputValueById("#phoneNumber");
        addressBookDataObject._address = getInputValueById('#address');
        addressBookDataObject._state = getInputValueById("#state");
        addressBookDataObject._city = getInputValueById("#city");
        addressBookDataObject._zipcode = getInputValueById("#zip");
    } catch (e) {
        console.log(e);
    }
    return addressBookDataObject;
}