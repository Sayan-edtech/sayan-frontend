const hostnames = ["localhost", "sayan.website"];

export function hasSubdomain() {
  const hostname = window.location.hostname;
  return hostname.includes(".") && !hostnames.includes(hostname);
}

export function getAcademyPath({ academySlug }: { academySlug?: string }) {
  const subdomain = window.location.hostname.split(".")[0];
  const academyPath = hasSubdomain() ? subdomain : `/academy/${academySlug}`;
  return academyPath;
}

export function redirectPath(path: string) {
  const academySlug = window.location.pathname.split("/")[2];
  const academyPath = getAcademyPath({ academySlug });
  const href = hasSubdomain() ? window.location.href : `${academyPath}/`;
  return (window.location.href = `${href}${path}`);
}
