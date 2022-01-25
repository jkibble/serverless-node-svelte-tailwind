const trans = (key, ...args) => {
  const lang = window.lang;

  console.log(args);

  return lang[key].replace(/{(\w+)}/g, args);
};

export { trans as t };