import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { commitWizardSession } from "~/sessions/wizard-session.server";

export async function loader({ request }: LoaderArgs) {
  return redirect("/advertisements/new/step/1", {
    headers: {
      "Set-Cookie": await commitWizardSession(request, null),
    },
  });
}

export default function WizardScreen() {
  return null;
}
