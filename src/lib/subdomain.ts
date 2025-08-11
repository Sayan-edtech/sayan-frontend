const hostnames = ["localhost", "sayan.website"];

export function hasSubdomain() {
  const hostname = window.location.hostname;
  return hostname.includes(".") && !hostnames.includes(hostname);
}
