const fs = require("fs");
const mime = require("mime-types");
const path = require("path");

module.exports.static = async (event, context) => {
  let file = event["pathParameters"]["path"];
  let type = mime.contentType(path.basename(file));
  let body = fs.readFileSync(`frontend/dist/${file}`, "utf-8");

  return {
    statusCode: 200,
    body: body,
    headers: { "content-type": type },
  };
};
