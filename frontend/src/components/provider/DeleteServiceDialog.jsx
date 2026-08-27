import {
  AlertTriangle,
  Loader2,
  Trash2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteServiceDialog = ({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
  serviceTitle,
}) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="max-w-md rounded-2xl">
        <AlertDialogHeader>
          {/* ICON */}

          <div
            className="
              mb-2
              flex h-12 w-12
              items-center justify-center
              rounded-xl
              bg-red-50
            "
          >
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          {/* TITLE */}

          <AlertDialogTitle
            className="
              text-xl
              font-bold
              text-gray-900
            "
          >
            Delete service?
          </AlertDialogTitle>

          {/* DESCRIPTION */}

          <AlertDialogDescription
            className="
              text-sm
              leading-6
              text-gray-500
            "
          >
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-700">
              {serviceTitle || "this service"}
            </span>
            ?

            <span className="mt-1 block">
              This action cannot be undone.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* FOOTER */}

        <AlertDialogFooter className="mt-4 gap-2 sm:gap-2">
          {/* CANCEL */}

          <AlertDialogCancel
            disabled={loading}
            className="
              rounded-xl
              border-gray-200
            "
          >
            Cancel
          </AlertDialogCancel>

          {/* CONFIRM DELETE */}

          <AlertDialogAction
            disabled={loading}
            onClick={(event) => {
              /*
               * Prevent AlertDialog from
               * automatically closing before
               * API request finishes.
               */
              event.preventDefault();

              onConfirm();
            }}
            className="
              rounded-xl
              bg-red-600
              text-white
              hover:bg-red-700
              focus:ring-red-500
            "
          >
            {loading ? (
              <>
                <Loader2
                  className="
                    mr-2
                    h-4 w-4
                    animate-spin
                  "
                />

                Deleting...
              </>
            ) : (
              <>
                <Trash2
                  className="
                    mr-2
                    h-4 w-4
                  "
                />

                Delete Service
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteServiceDialog;