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
    const [cookiePair] = cookie.split(';');
    const [name, value] = cookiePair.split('=').map((c) => c.trim());

    if (cookieNames.includes(name as CookieName)) {
      parsedCookies[name as CookieName] = value;
    }
  });

  return parsedCookies;
}

export default parseCookies;
