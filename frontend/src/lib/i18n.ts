const trans = (key, ...args) => {
  const lang = window.lang;

  if (lang[key]) {
    return lang[key].replace(/{(\w+)}/g, args);
  }

  return key;
};

export { trans as t };