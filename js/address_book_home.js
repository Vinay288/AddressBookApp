let contactsList;
window.addEventListener("DOMContentLoaded", (event) => {
    contactsList = getContactsDataFromStorage();
    document.querySelector(".address-count").textContent = contactsList.length;
    createInnerHtml();
    localStorage.removeItem("editEmp");
});
const getContactsDataFromStorage = () => {
    return localStorage.getItem("ContactsList")
        ? JSON.parse(localStorage.getItem("ContactsList"))
        : [];
};

const createInnerHtml = () => {
    console.log(contactsList);
    if (contactsList.length == 0) return;
    const headerHtml = "<tr><th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    for (const contactData of contactsList) {
        innerHtml = `${innerHtml}
              <tr>
                <td>${contactData.name}</td>
                <td>${contactData.address}</td>
                <td>${contactData.city}</td>
                <td>${contactData.state}</td>
                <td>${contactData.zipcode}</td>
                <td>${contactData.phone}</td>
                <td>
                  <img
                    id="${contactData.id}"
                    onclick="remove(this)"
                    alt="delete"
                    src="../assets/icons/delete-black-18dp.svg"
                  />
                  <img
                    id="${contactData.id}"
                    alt="edit"
                    onclick="update(this)"
                    src="../assets/icons/create-black-18dp.svg"
                  />
                </td>
              </tr>
        `;
        length += 1;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
};

const remove = (node) => {
    let contactData = contactsList.find(contact => contact.id == node.id);
    console.log(contactData);
    if (!contactData) return;
    const index = contactsList.map(contact => contact.id).indexOf(contactData.id);
    contactsList.splice(index, 1);
    localStorage.setItem("ContactsList", JSON.stringify(contactsList));
    document.querySelector(".address-count").textContent = contactsList.length;
    createInnerHtml();
};

const update = (node) => {
    let contactData = contactsList.find(contact => contact.id == node.id);
    if (!contactData) return;
    localStorage.setItem('editContact', JSON.stringify(contactData));
    window.location.replace(site_properties.add_contacts);
};
