import { useCallback } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useNavigate } from "@remix-run/react";

import { Modal, ModalContent, ModalHeader } from "~/components/modal";
import { useOutletHandle } from "~/hooks/use-outlet-handle";

export type OnboardingWizardHandle = {
  title: string;
  stepNumber: number;
  submitButton: React.ReactElement;
};

export default function WizardStepsLayoutScreen() {
  const { title, stepNumber, submitButton } =
    useOutletHandle<OnboardingWizardHandle>()[0];
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate("/advertisements"), [navigate]);
  return (
    <Modal>
      <ModalHeader
        title={
          <h1 className="my-3 flex flex-col font-medium">
            <span className="text-violet-500">Etape {stepNumber} sur 3</span>
            <span className="text-2xl text-slate-900">{title}</span>
          </h1>
        }
        closeButton={
          <button
            onClick={goBack}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100"
          >
            <XMarkIcon className="w-5 text-slate-700" />
          </button>
        }
      />
      <ModalContent>
        <Outlet />
        <div className="flex items-center justify-between pt-8">
          {stepNumber !== 1 ? <BackButton /> : null}
          {submitButton}
        </div>
      </ModalContent>
    </Modal>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <Link
      to=""
      onClick={(e) => {
        navigate(-1);
        e.preventDefault();
      }}
      className="font-medium text-slate-400 underline"
    >
      Retour
    </Link>
  );
}
