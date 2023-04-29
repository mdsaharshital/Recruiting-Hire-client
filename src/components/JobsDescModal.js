export function JobsDescModal({ isOpen, closeModal }) {
  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto w-screen">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-2xl w-full">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Modal Title
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ornare, quam sed lacinia malesuada, neque diam molestie nisl,
                  ac luctus neque velit sed tellus.
                </p>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
