const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const writeContacts = async (data) =>
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.filter((elem) => elem.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((elem) => elem.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await writeContacts(data);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await writeContacts(data);
  return newContact;
};

const updateContact = async (id, body) => {
  const result = await listContacts();
  const index = result.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  result[index] = { id, ...body };
  await writeContacts(result);
  return result[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
