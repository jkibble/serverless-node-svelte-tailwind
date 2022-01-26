const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const fs = require("fs");
const ejs = require("ejs");
const mime = require("mime-types");
const path = require("path");
const jwt = require("jsonwebtoken");

const assetFor = (path: string): string => {
  let imports = "";

  let manifest = fs.readFileSync("frontend/dist/manifest.json");
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

const getCookies = (event) => {
  let cookies = {};

  if (event["cookies"]) {
    event["cookies"].forEach((cookie) => {
      let foo = new URLSearchParams(cookie);
      cookies = { ...cookies, ...Object.fromEntries(foo) };
    });
  }

  return cookies;
};

module.exports.locales = async (event, context) => {
  let locale = event["pathParameters"]["locale"];
  let namespace = event["pathParameters"]["namespace"];
  let body = fs.readFileSync(`locales/${locale}/${namespace}.json`, "utf-8");

  return {
    statusCode: 200,
    body: body,
    headers: { "content-type": "application/json" },
  };
};

module.exports.api = async (event, context) => {
  let page = "index";
  let cookies = getCookies(event);
  let lang = JSON.stringify({});

  if (event["pathParameters"]["path"]) {
    page = event["pathParameters"]["path"];
  }

  const user = jwt.verify(cookies.token, "key");
  const locale = user.locale || "en";

  if (fs.existsSync(`locales/${locale}/${page}.json`)) {
    lang = fs.readFileSync(`locales/${locale}/${page}.json`, "utf-8");
  }

  let body = await ejs.renderFile(
    "pages/layout.html",
    { assetFor: assetFor, page: page, user: JSON.stringify(user), lang: lang },
    { async: true }
  );

  return {
    statusCode: 200,
    body: body,
    headers: { "content-type": "text/html" },
  };
};

module.exports.language = async (event, context) => {
  let locale = event["pathParameters"]["locale"];
  const cookies = getCookies(event);
  const foo = jwt.verify(cookies.token, "key");

  foo.locale = locale;
  const token = jwt.sign(foo, "key");

  return {
    statusCode: 303,
    body: '',
    headers: { 
      "location": "/",       
      "Set-Cookie": `token=${token}; HttpOnly; Path=/`,
    },
  };
}

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
  let token = jwt.sign({ email: form.get("email") }, "key");

  return {
    statusCode: 303,
    headers: {
      Location: "/",
      "Set-Cookie": `token=${token}; HttpOnly; Path=/`,
    },
  };
};
