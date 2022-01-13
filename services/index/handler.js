const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const fs = require("fs");
const ejs = require("ejs");
const mime = require("mime-types");
const path = require("path");
const jwt = require("jsonwebtoken");

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

module.exports.table = async (event, context) => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  let result = { header: [], body: [] };

  for (let x = 0; x < 9; x++) {
    result["header"].push(lorem.generateWords(1));
    result["body"].push([]);
    for (let y = 0; y < 9; y++) {
      result["body"][x].push(lorem.generateWords(1));
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

module.exports.post = async (event, context) => {
  let form = new URLSearchParams(event["body"]);

  console.log(form);
};

module.exports.login = async (event, context) => {
  let form = new URLSearchParams(event["body"]);
  console.log(form);
  let token = jwt.sign({ foo: "bar" }, "shhhhh");

  return {
    statusCode: 303,
    headers: {
      Location: "/",
      "Set-Cookie": `token=${token}; HttpOnly; Path=/`,
    },
  };
};
