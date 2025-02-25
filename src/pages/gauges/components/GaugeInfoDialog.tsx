import { ModalLayout } from "@/components/HeadlessUI";
import { Gauge } from "@/redux/gauges/reducers";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

interface GaugeInfoDialog {
  open: boolean;
  toggleModal: () => void;
  gauge: Gauge | null;
}

const GaugeInfoDialog = ({ open, gauge, toggleModal }: GaugeInfoDialog) => {

  return (
    <ModalLayout
      showModal={open}
      toggleModal={toggleModal}
      panelClassName="sm:max-w-lg"
      isStatic
      placement="justify-center items-center"
    >
      <div className="duration-500 ease-out transition-all sm:w-full m-3 sm:mx-auto flex flex-col bg-white border shadow-sm rounded-md dark:bg-slate-800 dark:border-gray-700">
        <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-white text-lg mr-8">
            General Information
          </h3>
          <button onClick={toggleModal} className="inline-flex justify-center items-center dark:text-gray-200">
            <i className="mgc_close_line text-xl"></i>
          </button>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <p><b>Unit + elaboration</b>: Medium-haul flights average (km)</p>
          </div>

          <div className="mb-2">
            <p><b>Scope 1</b>: -</p>
          </div>

          <div className="mb-2">
            <p><b>Scope 2 (Location based)</b>: -</p>
          </div>

          <div className="mb-2">
            <p><b>Scope 2 (Market based)</b>: -</p>
          </div>

          <div className="mb-2">
            <p><b>Scope 3</b>:  172 g / km</p>
          </div>

          <div className="mb-2">
            <p><b>Energy</b>: 2.8 MJ / km</p>
          </div>

          <div className="mb-2">
            <p><b>Money</b>: 0.35 EUR / km</p>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default GaugeInfoDialog;
