class AddressBookData {
    get id() { return this._id; }
    set id(id) { this._id = id; }

    get name() { return this._name; }
    set name(name) {
        if (checkName(name))
            this._name = name;
        else throw 'Name is Incorrect';
    }

    get phone() { return this._phone; }
    set phone(phone) {
        if (checkPhoneNumber(phone) && phone.length != 0)
            this._phone = phone;
        else throw 'Phone Number is Invalid';
    }

    get address() { return this._address }
    set address(address) {
        if (checkAddress(address))
            this._address = address;
        else throw 'Address is Incorrect';
    }

    get city() { return this._city }
    set city(city) {
        if (city == "")
            throw 'please select a value for city';
        this._city = city;
    }

    get state() { return this._state }
    set state(state) {
        if (state == "")
            throw 'please select a value for state';
        this._state = state;
    }

    get zipcode() { return this._zipcode }
    set zipcode(zipcode) {
        if (checkZipCode(zipcode))
            this._zipcode = zipcode;
        else throw 'Incorrect Zip code';
    }

    toString() {
        return "id= " + this.id + ", full name=" + this.name + ", phone number=" + this.phone + ", address=" + this.address + ", city=" + this.city + ", state=" + this.state + ", zip code=" + this.zipcode + "\n";
    }
}