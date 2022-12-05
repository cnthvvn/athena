import { redirect } from "@remix-run/node";

export function assertReferer(
  request: Request,
  { redirectTo }: { redirectTo: string }
) {
  const referer = request.headers.get("referer");

  if (!referer) {
    throw redirect(redirectTo);
  }
}
