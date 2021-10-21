let isUpdate = false;
let contactDataObject = {};
let stateList;
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            buttonAction(true);
            return;
        }
        try {
            checkName(name.value);
            enableButton();
            textError.textContent = "";
        } catch (e) {
            buttonAction(true);
            textError.textContent = e;
        }
    });
    const phoneNumber = document.querySelector('#phoneNumber');
    const PhoneNumberError = document.querySelector('.tel-error');
    phoneNumber.addEventListener('input', function () {
        if (phoneNumber.value.length == 0) {
            PhoneNumberError.textContent = "";
            buttonAction(true);
            return;
        }
        try {
            checkPhoneNumber(phoneNumber.value);
            enableButton();
            PhoneNumberError.textContent = "";
        } catch (e) {
            buttonAction(true);
            PhoneNumberError.textContent = e;
        }
    });

    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zip-error');
    zip.addEventListener('input', function () {
        if (zip.value.length == 0) {
            zipError.textContent = "";
            buttonAction(true);
            return;
        }
        try {
            checkZipCode(zip.value);
            enableButton();
            zipError.textContent = "";
        } catch (e) {
            buttonAction(true);
            zipError.textContent = e;
        }
    });
    const state = document.querySelector('#state');
    state.addEventListener('input', function () {
        let cityList = stateList[state.value];
        createCityInnerHtml(cityList);
    });
    const address = document.querySelector('#address');
    const addressError = document.querySelector('#address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = "";
            buttonAction(true);
            return;
        }
        try {
            checkAddress(address.value);
            enableButton();
            addressError.textContent = "";

        } catch (e) {
            buttonAction(true);
            addressError.textContent = e;
        }
    });
    const enableButton = () => {
        if (zip.value && phoneNumber.value && name.value && address.value) {
            buttonAction(false);
        }
    }
    makeServiceCall("GET", site_properties.state_url, true)
        .then(responseText => {
            stateList = JSON.parse(responseText);
            createStateInnerHtml();
        })
        .catch(error => {
            console.log("GET error status" + JSON.stringify(error));
            stateList = [];
        });

    checkForUpdate();
});
const createCityInnerHtml = (cityList) => {
    let innerHtml = `<option value="" disabled selected hidden>Select City</option>`;
    for (const city of cityList) {
        innerHtml = `${innerHtml}<option value="${city}">${city}</option>`
    }
    document.querySelector("#city").innerHTML = innerHtml;
}
const createStateInnerHtml = () => {
    let innerHtml = `<option value="" disabled selected hidden>Select State</option>`;
    for (const state of Object.keys(stateList)) {
        innerHtml = `${innerHtml}<option value="${state}">${state}</option>`
    }
    document.querySelector("#state").innerHTML = innerHtml;
}
const checkForUpdate = () => {
    const contactsJson = localStorage.getItem('editContact');
    isUpdate = contactsJson ? true : false;
    if (!isUpdate) return;
    contactDataObject = JSON.parse(contactsJson);
    setForm();
};
const setForm = () => {
    document.getElementById('submitButton').innerHTML = "Update";
    buttonAction(false);
    setValue('#name', contactDataObject.name);
    setValue('#phoneNumber', contactDataObject.phone);
    setValue('#address', contactDataObject.address);
    setValue('#city', contactDataObject.city);
    setValue('#state', contactDataObject.state);
    setValue('#zip', contactDataObject.zipcode);
};
const setValue = (propertyId, value) => {
    const element = document.querySelector(propertyId);
    element.value = value;
};
const buttonAction = (value) => {
    document.getElementById('submitButton').disabled = value;
    document.getElementById('resetButton').disabled = value
}

const save = () => {
    event.preventDefault();
    event.stopPropagation();
    try {
        createAddressBookDataObject();
        if (site_properties.localStorage.match("true")) {
            createAndUpdateStorage();
        }
        else {
            createOrUpdateContactDataToServer();
        }
        window.location.replace(site_properties.home_page);
    }
    catch (e) {
        alert("please Enter all values")
    }
}
const reset = () => {
    setValue("#name", "");
    setValue("#phoneNumber", "");
    setValue("#address", "");
    setValue("state", "");
    setValue("city", "");
    setValue("zip", "");
}
const createAddressBookDataObject = () => {
    try {
        if (!isUpdate && site_properties.localStorage.match("true")) contactDataObject.id = createNewContactId();
        contactDataObject.name = getInputValueById('#name');
        contactDataObject.phone = getInputValueById("#phoneNumber");
        contactDataObject.address = getInputValueById('#address');
        contactDataObject.state = getInputValueById("#state");
        contactDataObject.city = getInputValueById("#city");
        contactDataObject.zipcode = getInputValueById("#zip");
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
    let contactsList = JSON.parse(
        localStorage.getItem("ContactsList")
    );
    if (contactsList) {
        let contactData = contactsList.find(
            (contact) => contact.id == contactDataObject.id
        );
        console.log(contactDataObject.id);
        if (!contactData) {
            contactsList.push(contactDataObject);
        } else {
            const index = contactsList
                .map((contact) => contact.id)
                .indexOf(contactData.id);
            contactsList.splice(
                index,
                1,
                contactDataObject
            );
        }
    } else {
        contactsList = [contactDataObject];
    }
    localStorage.setItem(
        "ContactsList",
        JSON.stringify(contactsList)
    );
}
const createOrUpdateContactDataToServer = () => {
    let postURL = site_properties.site_url;
    let methodCall = "POST";

    if (isUpdate) {
        methodCall = "PUT"
        postURL = postURL + contactDataObject.id.toString();
    }

    makeServiceCall(methodCall, postURL, true, contactDataObject)
        .then(responseText => {
            resetForm();
        })
        .catch(error => {
            throw error;
        });
}