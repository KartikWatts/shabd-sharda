import React from "react";
import UserAuth from "./UserAuth";

type SignInProps = {
  isModalOpen: boolean;
  updateModalState: (stateArg: boolean) => void;
};

function SignInModal(props: SignInProps) {
  return (
    <>
      {props.isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => props.updateModalState(false)}
            />

            {/* This element is to trick the browser into centering the modal contents. */}

            <span
              aria-hidden="true"
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
            >
              &#8203;
            </span>

            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:mt-0 sm:ml-4">
                <div className="flex flex-col">
                  <div className="mt-3 text-center  sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">
                      Sign In
                    </h3>

                    <hr />
                  </div>

                  <div className="mt-5">
                    <UserAuth />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  className="mt-5 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.updateModalState(false)}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignInModal;
