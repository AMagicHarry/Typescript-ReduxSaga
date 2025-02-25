import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { parseISO, isEqual, isAfter } from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { FormInput, VerticalForm } from "@/components";
import Navigation from "@/components/Navigation.tsx";
import { interval_options, unit_options } from "@/pages/gauges/create/constants.ts";
import { GaugeData } from "@/pages/gauges/create";

export const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ script: "super" }, { script: "sub" }],
    [{ header: [false, 1, 2, 3, 4, 5, 6] }, "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ]
};

interface GeneralGaugeProps {
  gaugeData: GaugeData;
  handlePreviousStep: any;
  handleNextStep: any;
}

interface GeneralGaugeData {
  name: string;
  unit: string;
  time_interval: string;
  started_on: string;
  ended_on?: string | null;
}

const GeneralStep: React.FC<GeneralGaugeProps> = ({ gaugeData, handlePreviousStep, handleNextStep }) => {
  const [importManner, setImportManner] = useState<boolean>(gaugeData.import_only);

  const schemaResolver = yupResolver<GeneralGaugeData>(
    yup.object().shape({
      name: yup.string().required('Name is required'),
      unit: yup.string().required('Unit is required'),
      time_interval: yup.string().required('Interval is required'),
      started_on: yup.string().required('Start date is required'),
      ended_on: yup.string()
        .nullable()
        .test("minDate", "End date must be later than start date", function (value) {
          const started_on = this.resolve(yup.ref("started_on"));
          if (!started_on || !value) {
            return true;
          }

          try {
            const parsedFrom = parseISO(started_on as string);
            const parsedValue = parseISO(value as string);
            return isEqual(parsedValue, parsedFrom) || isAfter(parsedValue, parsedFrom);
          } catch (error) {
            return this.createError({ message: 'Invalid date format' });
          }
        }),
    })
  );

  const updateField = <K extends keyof GaugeData>(field: K, value: GaugeData[K]) => {
    gaugeData[field] = value;
  };

  const handleCheckManner = (field: keyof GaugeData, value: boolean) => {
    setImportManner(value);
    updateField(field, value);
  }

  const handleGaugeData = async (data: GeneralGaugeData) => {
    gaugeData.name = data.name;
    gaugeData.unit = data.unit;
    gaugeData.time_interval = data.time_interval;
    gaugeData.started_on = data.started_on;
    gaugeData.ended_on = data.ended_on;
    handleNextStep(gaugeData);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-black text-lg my-4">Properties</h1>
        <h2 className="text-black">The properties below will be applied to all newly created gauges</h2>
      </div>
      <VerticalForm<GeneralGaugeData>
        defaultValues={{
          name: gaugeData.name,
          unit: gaugeData.unit,
          time_interval: gaugeData.time_interval,
          started_on: gaugeData.started_on,
          ended_on: gaugeData.ended_on,
        }}
        onSubmit={handleGaugeData}
        resolver={schemaResolver}
      >
        <FormInput
          name="name"
          type="text"
          label="Name*"
          labelClassName="text-black text-sm inline-block mb-2"
          className="form-input mb-2"
        />
        <div className="flex flex-col gap-2 mb-2">
          <h4 className="text-black text-sm inline-block">Description</h4>
          <ReactQuill
            id="description"
            modules={modules}
            value={gaugeData.description}
            onChange={(value) => updateField("description", value)}
            className="text-black"
            theme="snow"
          />
        </div>

        <FormInput
          label="Unit*"
          type="select"
          name="unit"
          labelClassName="text-black text-sm inline-block mb-2"
          className="form-select mb-2"
          required
        >
          {unit_options.map((unit) => (
            <option value={unit.value} key={`unit-${unit.id}`}>
              {unit.name}
            </option>
          ))}
        </FormInput>

        <FormInput
          label="Time interval*"
          type="select"
          name="time_interval"
          labelClassName="text-black text-sm inline-block mb-2"
          className="form-select mb-2"
          required
        >
          {interval_options.map((time_interval) => (
            <option value={time_interval.value} key={`interval-${time_interval.id}`}>
              {time_interval.name}
            </option>
          ))}
        </FormInput>
        <FormInput
          label="From*"
          type="date"
          name="started_on"
          id="started_on"
          labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
          className="form-input mb-2 w-[45%]"
        />
        <FormInput
          label="Until"
          type="date"
          name="ended_on"
          id="ended_on"
          labelClassName="text-gray-800 text-sm font-medium inline-block mb-2"
          className="form-input mb-2 w-[45%]"
        />
        {/*<div>*/}
        {/*  <h6 className="text-gray-800 text-sm font-medium inline-block mb-2">Import Gauge</h6>*/}
        {/*  <div className="flex flex-col gap-2">*/}
        {/*    <div className="form-check">*/}
        {/*      <input*/}
        {/*        type="radio"*/}
        {/*        className="form-radio text-primary"*/}
        {/*        name="import_only"*/}
        {/*        id="importGaugeManual"*/}
        {/*        onChange={() => handleCheckManner("import_only", true)}*/}
        {/*        checked={importManner}*/}
        {/*      />*/}
        {/*      <label className="ms-1.5" htmlFor="importGaugeManual">*/}
        {/*        Gauge can be filled in manually*/}
        {/*      </label>*/}
        {/*    </div>*/}
        {/*    <div className="form-check">*/}
        {/*      <input*/}
        {/*        type="radio"*/}
        {/*        className="form-radio text-primary"*/}
        {/*        name="import_only"*/}
        {/*        id="importGaugeImports"*/}
        {/*        onChange={() => handleCheckManner("import_only", false)}*/}
        {/*        checked={!importManner}*/}
        {/*      />*/}
        {/*      <label className="ms-1.5" htmlFor="importGaugeImports">*/}
        {/*        Gauge can be filled by imports*/}
        {/*      </label>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <Navigation handlePreviousStep={handlePreviousStep} />
      </VerticalForm>
    </div>
  );
};

export default GeneralStep;