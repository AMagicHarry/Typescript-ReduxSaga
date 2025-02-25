import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageBreadcrumb } from "../../components";
import cn from "classnames";
import GaugeFilter from "./components/GaugeFilter";
import GaugesList from "./components/GaugesList";
import { Link } from "react-router-dom";
import GaugesApproveList from "./components/GaugesApproveList";
import { Toaster } from "@/components/ui/toaster";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { updateQuarter, updateYear } from "@/redux/actions";
import QuarterSelector from "@/components/QuarterSelector";

const Gauges = () => {
  const tabs = ["gauges", "approve"];
  const [selectedTab, setSelectedTab] = useState("gauges");

  const { user, year, quarter } = useSelector((state: RootState) => ({
    user: state.Auth.user,
    year: state.Gauge.year,
    quarter: state.Gauge.quarter,
  }));

  const dispatch = useDispatch<AppDispatch>();

  const setYear = (year: number) => {
    dispatch(
      updateYear(year)
    );
  };

  const setQuartar = (quarter: number) => {
    dispatch(
      updateQuarter(quarter)
    );
  };

  return (
    <>
      <Toaster />
      <PageBreadcrumb
        title="Gauges"
        name="Gauges"
      />

      <div className="flex justify-end pb-2 gap-2">
        {/*<Link to="/gauges/bulk-edit" className="btn border-gray-400 text-xs px-2 py-1">*/}
        {/*  <i className="mgc_edit_3_line mr-1"></i>*/}
        {/*  Bulk Edit*/}
        {/*</Link>*/}
        {/*<Link to="/gauges/bult-delet" className="btn border-gray-400 text-xs px-2 py-1">*/}
        {/*  <i className="mgc_delete_line mr-1"></i>*/}
        {/*  Bulk Delete*/}
        {/*</Link>*/}
        {user.roles.some(
          (role: { id: number; name: string }) => role.name === "admin"
        ) && (
          <Link
            to="/gauges/create"
            className="btn border-gray-400 text-xs px-2 py-1"
          >
            <i className="mgc_add_line mr-1"></i>
            Add new Gauge
          </Link>
        )}
      </div>

      <div className="flex gap-3 mx-auto">
        <GaugeFilter />

        <div className="flex-1">
          <QuarterSelector
            year={year}
            quarter={quarter}
            onChangeYear={setYear}
            onChangeQuarter={setQuartar}
          />

          <div className="card flex-1">
            <ul
              className="flex list-none flex-row flex-wrap border-b-0 ps-0"
              role="tablist"
            >
              {tabs.map((tab, index) => (
                <li role="presentation" key={index}>
                  <a
                    onClick={() => setSelectedTab(tab)}
                    className={cn(
                      "mt-2 block cursor-pointer border-b-2 px-7 pb-2.5 pt-3 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:bg-neutral-100 focus:isolate focus:border-transparent",
                      {
                        "border-primary text-primary": selectedTab === tab,
                        "border-transparent": selectedTab !== tab,
                      }
                    )}
                    role="tab"
                  >
                    {tab}
                  </a>
                </li>
              ))}
            </ul>

            {selectedTab === "gauges" && <GaugesList />}
            {selectedTab === "approve" && <GaugesApproveList />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gauges;
