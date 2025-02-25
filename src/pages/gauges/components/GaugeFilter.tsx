import FeatherIcon from "feather-icons-react";
import { Collapse } from "@/components/FrostUI";
import { Popover } from "@headlessui/react";
import { MouseEvent, useEffect, useState } from "react";
import { ModalLayout, PopoverLayout } from "@/components/HeadlessUI";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput, VerticalForm } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { getCategories } from "@/redux/categories/actions.ts";
import { getEntities } from "@/redux/entities/actions.ts";
import { Entity } from "@/redux/entities/reducers.ts";
import { Category } from "@/redux/categories/reducers.ts";
import { GaugeFilter as Filter } from "@/redux/gauges/reducers";
import { updateFilter } from "@/redux/actions";
import debounce from "lodash/debounce";
import { getGauges } from "@/redux/gauges/actions.ts";

const GAUGE_FILTER_KEY = "gauge-filter";

const GaugeFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, entities, filter } = useSelector(
    (state: RootState) => ({
      entities: state.Entity.entities,
      categories: state.Category.categories,
      filter: state.Gauge.filter,
    })
  )

  const [quickFilters, setQuickFilter] = useState<
    {
      name: string;
      value: Filter;
    }[]
  >([]);

  const [isOpenQuickFilterModal, setIsOpenQuickFilterModal] = useState(false);

  const [searchKey, setSearchKey] = useState(filter.searchKey);

  const setFilter = (value: Filter) => {
    dispatch(updateFilter(value));
  };

  const toggleQuickFilterModal = () => {
    setIsOpenQuickFilterModal(!isOpenQuickFilterModal);
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getEntities());
  }, [dispatch]);

  useEffect(() => {
    const originQuickFilter = localStorage.getItem(GAUGE_FILTER_KEY);
    if (originQuickFilter) {
      setQuickFilter(JSON.parse(originQuickFilter));
    }
  }, []);

  useEffect(() => {
    dispatch(getGauges(filter));
  }, [filter]);

  const debounceSetSearchKey = debounce((value) => {
    if (filter.searchKey !== value) {
      setFilter({
        ...filter,
        searchKey: value
      });
    }
  }, 500);

  useEffect(() => {
    debounceSetSearchKey(searchKey);

    return () => {
      debounceSetSearchKey.cancel();
    };
  }, [searchKey])

  const handleChangeFilter = (field: keyof typeof filter, val: number) => {
    setFilter({
      ...filter,
      [field]: filter[field].includes(val)
        ? filter[field].filter((item: number) => item !== val)
        : [...filter[field], val],
    });
  };

  const handleClearFilter = (field: keyof typeof filter, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFilter({
      ...filter,
      [field]: [],
    });
  };

  const quickFilterSchemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please enter name"),
    })
  );

  const handleAddQuickFilter = ({ name }: { name: string }) => {
    const updatedFilters = [
      ...quickFilters,
      {
        name,
        value: filter,
      },
    ];
    setQuickFilter(updatedFilters);
    localStorage.setItem(GAUGE_FILTER_KEY, JSON.stringify(updatedFilters));
    setIsOpenQuickFilterModal(false);
  };

  const handleRemoveQuickFilter = (e: MouseEvent, i: number) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedFilters = quickFilters.filter((_, index) => index !== i);
    setQuickFilter(updatedFilters);
    localStorage.setItem(GAUGE_FILTER_KEY, JSON.stringify(updatedFilters));
  };

  return (
    <div className="card w-64 min-w-64 p-3 pb-4">
      <h3 className="text-lg font-medium mb-1">Filters</h3>

      <div className="flex gap-2">
        <PopoverLayout
          className="flex-1"
          placement="bottom-start"
          togglerClass="w-full"
          toggler={
            <div className="w-full border disabled:bg-gray-50 px-2 py-1 text-sm rounded-lg flex items-center justify-center cursor-pointer">
              Quick filters <i className="text-2xl mgc_down_small_fill" />
            </div>
          }
        >
          <div className="z-50 mt-1 w-44 transition-all duration-300 bg-white border shadow-md rounded-lg p-2 dark:bg-slate-800 dark:border-slate-700">
            {!quickFilters.length ? (
              <span className="flex items-center w-40 py-2 px-3 rounded-md text-xs text-center text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-pointer">
                No quick filters
              </span>
            ) : (
              <>
                {quickFilters.map((quickFilter, index) => (
                  <Popover.Button
                    key={`${quickFilter.name}-${index}`}
                    onClick={() => setFilter(quickFilter.value)}
                    className="flex w-full justify-between items-center px-2 py-1.5 hover:bg-gray-100 text-gray-800 rounded"
                  >
                    {quickFilter.name}
                    <div onClick={(e) => handleRemoveQuickFilter(e, index)}>
                      <i className="mgc_delete_2_line" />
                    </div>
                  </Popover.Button>
                ))}
              </>
            )}
          </div>
        </PopoverLayout>
        <button
          onClick={toggleQuickFilterModal}
          className="btn bg-primary text-white px-2.5 py-1.5 text-xs"
        >
          <i className="mgc_add_fill"></i>
        </button>
      </div>

      <div className="flex pt-3 pb-1">
        <div className="inline-flex text-xs items-center px-2 rounded-s border border-e-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
          <FeatherIcon className="size-4" icon="search" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="form-input rounded-none py-1.5 text-xs"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <div
          onClick={() => setSearchKey("")}
          className="cursor-pointer inline-flex items-center px-2 rounded-e border border-s-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400"
        >
          clear
        </div>
      </div>

      <Collapse defaultOpen={true}>
        <Collapse.Toggle
          openClass="hover:text-primary"
          className="pt-3 pb-1 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
        >
          <div className="flex items-center gap-2">
            Entities
            <i className="mgc_down_line block"></i>
            <i className="mgc_right_line hidden"></i>
          </div>
          <div
            className="text-primary"
            onClick={(e) => handleClearFilter("entities", e)}
          >
            clear
          </div>
        </Collapse.Toggle>
        <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
          {entities?.map((entity: Entity) => (
            <div key={entity.id} className="form-check flex items-center ml-2">
              <input
                onChange={() => handleChangeFilter("entities", entity.id)}
                type="checkbox"
                id={`entity-filter-${entity.id}`}
                checked={filter.entities.includes(entity.id)}
                className="form-checkbox rounded text-primary"
              />
              <label
                onChange={() => handleChangeFilter("entities", entity.id)}
                className="text-sm ml-1.5 mt-0.5"
                htmlFor={`entity-filter-${entity.id}`}
              >
                {entity.name}
              </label>
            </div>
          ))}
        </Collapse.Menu>
      </Collapse>

      <Collapse defaultOpen={true}>
        <Collapse.Toggle
          openClass="hover:text-primary"
          className="pt-3 pb-1 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
        >
          <div className="flex items-center gap-2">
            Categories
            <i className="mgc_down_line block"></i>
            <i className="mgc_right_line hidden"></i>
          </div>
          <div
            className="text-primary"
            onClick={(e) => handleClearFilter("categories", e)}
          >
            clear
          </div>
        </Collapse.Toggle>
        <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
          {categories?.map((category: Category) => (
            <div
              key={category.id}
              className="form-check flex items-center ml-2 mb-2"
            >
              <input
                onChange={() => handleChangeFilter("categories", category.id)}
                type="checkbox"
                id={`category-filter-${category.id}`}
                checked={filter.categories.includes(category.id)}
                className="form-checkbox rounded text-primary"
              />
              <label
                onChange={() => handleChangeFilter("categories", category.id)}
                htmlFor={`category-filter-${category.id}`}
                className="text-sm ml-1.5 mt-0.5"
              >
                {category.name}
              </label>
            </div>
          ))}
        </Collapse.Menu>
      </Collapse>

      <ModalLayout
        showModal={isOpenQuickFilterModal}
        toggleModal={toggleQuickFilterModal}
        panelClassName="sm:max-w-lg"
        isStatic
        placement="justify-center items-center"
      >
        <div className="duration-500 ease-out transition-all sm:w-full m-3 sm:mx-auto flex flex-col bg-white border shadow-sm rounded-md dark:bg-slate-800 dark:border-gray-700">
          <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-white text-lg mr-8">
              Save current selection as Quick filter
            </h3>
            <button className="inline-flex justify-center items-center h-8 w-8 dark:text-gray-200">
              <span
                className="material-symbols-rounded"
                onClick={toggleQuickFilterModal}
              >
                close
              </span>
            </button>
          </div>
          <VerticalForm<{ name: string }>
            onSubmit={handleAddQuickFilter}
            resolver={quickFilterSchemaResolver}
          >
            <FormInput
              label="Name"
              type="text"
              name="name"
              placeholder="Enter Name"
              containerClass="mb-4 px-4 py-4"
              className="form-input"
              labelClassName="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-1"
              required
            />

            <div className="flex justify-end items-center gap-2 px-4 py-3 border-t dark:border-slate-700">
              <button
                className="py-2 px-5 inline-flex justify-center items-center gap-2 rounded dark:text-gray-200 border dark:border-slate-700 font-medium hover:bg-slate-100 hover:dark:bg-slate-700 transition-all"
                onClick={toggleQuickFilterModal}
                type="button"
              >
                Cancel
              </button>

              <button type="submit" className="btn text-white bg-primary">
                Create Quick filter
              </button>
            </div>
          </VerticalForm>
        </div>
      </ModalLayout>
    </div>
  );
};

export default GaugeFilter;
