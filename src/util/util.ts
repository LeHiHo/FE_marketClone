type CookieName = 'access-token' | 'refresh-token';
type ParsedCookies = {
  [key in CookieName]?: string;
};

function parseCookies(
  cookies: string[],
  cookieNames: CookieName[],
): ParsedCookies {
  const parsedCookies: ParsedCookies = {};

  cookies.forEach((cookie) => {
    const [nameValue, ...rest] = cookie.split(';');
    const [name, value] = nameValue.split('=');

    if (cookieNames.includes(name as CookieName)) {
      parsedCookies[name as CookieName] = value;
    }
  });

  return parsedCookies;
}

export default parseCookies;
