const jwt = require("jsonwebtoken");

module.exports.login = async (event, context) => {
  let form = new URLSearchParams(event["body"]);
  let token = jwt.sign({ email: form.get("email") }, "key");

  return {
    statusCode: 303,
    headers: {
      Location: "/",
      "Set-Cookie": `token=${token}; HttpOnly; Path=/`,
    },
  };
};
