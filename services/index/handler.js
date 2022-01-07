const fs = require("fs");
const ejs = require("ejs");
const mime = require("mime-types");
const path = require("path");

const assetFor = (path) => {
  let imports = "";

  let manifest = fs.readFileSync("public/manifest.json");
  let data = JSON.parse(manifest);

  if (data[`virtual:${path}`]) {
    let entry = data[`virtual:${path}`];

    if (entry["css"]) {
      entry["css"].forEach((file) => {
        imports += `<link rel="stylesheet" href="/static/${file}">`;
      });
    }

    if (entry["file"]) {
      imports += `<script type="module" src="/static/${entry["file"]}"></script>`;
    }
  }

  return imports;
};

module.exports.api = async (event, context) => {
  let page = "index";
  if (event["pathParameters"]["path"]) {
    page = event["pathParameters"]["path"];
  }

  let body = await ejs.renderFile(
    "pages/layout.html",
    { assetFor: assetFor, page: page },
    { async: true }
  );

  return {
    statusCode: 200,
    body: body,
    headers: { "content-type": "text/html" },
  };
};

module.exports.static = async (event, context) => {
  let file = event["pathParameters"]["path"];
  let type = mime.contentType(path.basename(file));
  let body = fs.readFileSync(`public/${file}`, "utf-8");

  return {
    statusCode: 200,
    body: body,
    headers: { "content-type": type },
  };
};
