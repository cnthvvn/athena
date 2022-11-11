import { createCookieSessionStorage, redirect } from "@remix-run/node";

import type { Advertisement } from "~/models/advertisement.server";

export type WizardSession = Advertisement;

const SESSION_KEY = "wizardSession";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__wizardSession",
    httpOnly: true,
    path: "/advertisements/new",
    sameSite: "lax",
    // secrets: ["s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});

async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getWizardSession<T>(request: Request) {
  const session = await getSession(request);
  return session.get(SESSION_KEY) as T;
}

export async function getMaybeWizardSession<T>(request: Request) {
  const maybeWizardSession = await getWizardSession<T>(request);
  return maybeWizardSession || null;
}

export async function commitWizardSession(
  request: Request,
  wizardSession: Partial<WizardSession> | null
) {
  const session = await getSession(request);

  // merge the existing session with the new data
  if (wizardSession) {
    session.set(SESSION_KEY, {
      ...(session.get(SESSION_KEY) || {}),
      ...wizardSession,
    });
  } else {
    session.set(SESSION_KEY, null);
  }

  return sessionStorage.commitSession(session);
}

export async function destroyWizardSession(request: Request) {
  const session = await getSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
