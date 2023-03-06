const Responses = require("./API_Responses");
const users = {
  1: { name: "Noor", age: 26 },
  2: { name: "Usman", age: 24 },
};
exports.getUsers = async (event) => {
  try {
    return Responses._200(users);
  } catch (err) {
    console.error(err);
    return Responses._500({ message: err.message });
  }
};
exports.getUser = async (event) => {
  try {
    const id = event.pathParameters.id;
    if (!event.pathParameters || !id) {
      return Responses._400({ message: "id is required" });
    }
    if (users[id]) {
      return Responses._200(users[id]);
    }
    return Responses._404({ message: "User not found" });
  } catch (err) {
    console.error(err);
    return Responses._500({ message: err.message });
  }
};
exports.createUser = async (event) => {
  try {
    const user = event.body;
    if (!user) {
      return Responses._400({ message: "User details are required" });
    }
    const id = Object.keys(user).at(-1);
    users[+id + 1] = user;
    return Responses._200({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return Responses._500({ message: err.message });
  }
};
