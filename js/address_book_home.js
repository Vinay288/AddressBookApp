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
    for (const personData of contactsList) {
      innerHtml = `${innerHtml}
              <tr>
                <td>${personData.name}</td>
                <td>${personData.address}</td>
                <td>${personData.city}</td>
                <td>${personData.state}</td>
                <td>${personData.zipcode}</td>
                <td>${personData.phone}</td>
                <td>
                  <img
                    id="${personData.id}"
                    onclick="remove(this)"
                    alt="delete"
                    src="../assets/icons/delete-black-18dp.svg"
                  />
                  <img
                    id="${personData.id}"
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
    let personData = contactsList.find(contactData => contactData.id == node.id);
    console.log(personData);
    if (!personData) return;
    const index = contactsList.map(contactData => contactData.id).indexOf(personData.id);
    contactsList.splice(index, 1);
    localStorage.setItem("ContactsList", JSON.stringify(contactsList));
    document.querySelector(".address-count").textContent = contactsList.length;
    createInnerHtml();
  }
 