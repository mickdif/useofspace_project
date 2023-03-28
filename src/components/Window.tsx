import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface ParkingSearchProps {
  handleParkingSearch: () => void;
  loading: boolean;
  parkingArea: number;
  windowBoundArea: number;
  setShowInfoModal: (show: boolean) => void;
  error: boolean;
}

export const Window = ({
  handleParkingSearch,
  loading,
  parkingArea,
  windowBoundArea,
  setShowInfoModal,
  error,
}: ParkingSearchProps) => {
  return (
    <div className="fixed left-0 py-1 px-1 z-10 bottom-0 md:top-0">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-blue-500">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "0.5rem" }}>OpenParkingMap</span>
            <div
              onClick={() => setShowInfoModal(true)}
              className="cursor-pointer"
            >
              <InformationCircleIcon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </h2>

        {loading ? (
          <div className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
            loading...
          </div>
        ) : (
          <div
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 cursor-pointer"
            onClick={handleParkingSearch}
          >
            Show At-Grade Parking
          </div>
        )}

        {parkingArea > 0 && (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                  <span>Details</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-blue-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <b>At-Grade Parking:</b> {parkingArea.toFixed(1)} ac
                  <br />
                  <b>Area in Window:</b> {windowBoundArea.toFixed(1)} ac
                  <br />
                  <b>% of window: </b>
                  {((parkingArea / windowBoundArea) * 100).toFixed(1)} %
                  <br />
                  <br />
                  <div className="max-w-sm w-44 text-xs italic">
                    {`Data is pulled from OpenStreetMap. `}
                    <a
                      onClick={() => setShowInfoModal(true)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Details here.
                    </a>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )}
        {error && (
          <div className="text-red-500">
            Error loading data. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};
