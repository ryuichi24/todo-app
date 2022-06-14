const appendURLParam = (key, value) => {
  if (history.pushState) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newURL = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }?${searchParams.toString()}`;

    window.history.pushState({ path: newURL }, "", newURL);
  }
};

const parseURLParams = (params) => {
  const parsed = {};

  let match;
  const excludePlus = /\+/g;
  const searchQuery = /([^&=]+)=?([^&]*)/g;

  const decode = (fieldOrValue) => {
    return decodeURIComponent(fieldOrValue.replace(excludePlus, " "));
  };

  let isMatchOver = true;

  while (isMatchOver) {
    match = searchQuery.exec(params.substring(1));

    if (!match) {
      isMatchOver = false;
      break;
    }

    parsed[decode(match[1])] = decode(match[2]);
  }

  return parsed;
};

export const URLUtil = Object.freeze({ appendURLParam, parseURLParams });
