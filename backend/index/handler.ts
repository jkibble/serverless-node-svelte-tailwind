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
  let body = {};

  if (fs.existsSync(`locales/${locale}/${namespace}.json`)) {
    body = fs.readFileSync(`locales/${locale}/${namespace}.json`, "utf-8");
  } else if (fs.existsSync(`locales/en/${namespace}.json`)) {
    body = fs.readFileSync(`locales/en/${namespace}.json`, "utf-8");
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Not found" }),
      headers: { "content-type": "application/json" },
    };
  }

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
  } else if (fs.existsSync(`locales/en/${page}.json`)) {
    lang = fs.readFileSync(`locales/en/${page}.json`, "utf-8");
  }

  let body = await ejs.renderFile(
    "pages/layout.html",
    { assetFor, page, lang, locale, user: JSON.stringify(user) },
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
      "location": event['headers']['Referer'] || "/",       
      "Set-Cookie": `token=${token}; HttpOnly; Path=/`,
    },
  };
}

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
