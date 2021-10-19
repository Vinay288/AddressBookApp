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
});