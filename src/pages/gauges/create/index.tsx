import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import * as yup from "yup";
import { PageBreadcrumb } from "@/components";
import GeneralStep from './components/GeneralStep';
import CategoriesStep from './components/CategoriesStep';
import EntitiesStep from './components/EntitiesStep';
import FinalizeStep from './components/FinalizeStep';
import ProgressBar from "@/components/ProgressBar.tsx";
import { steps } from "@/pages/gauges/create/constants.ts";
import { createGauge } from "@/helpers";
import { toast } from "@/hooks/use-toast.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { getCategories } from "@/redux/categories/actions.ts";
import { getEntities } from "@/redux/entities/actions.ts";
import { useNavigate } from "react-router-dom";

export interface GaugeData {
  name: string;
  description?: string;
  unit: string;
  time_interval: string;
  started_on: string;
  ended_on?: string | null;
  category_ids: number[];
  import_only: boolean;
  entity_ids: number[];
}

const INITIAL_DATA: GaugeData = {
  name: '',
  description: '',
  unit: '',
  time_interval: '',
  started_on: '',
  ended_on: '',
  category_ids: [],
  import_only: false,
  entity_ids: [],
};

function ManualGauge() {
  const [currentStep, setCurrentStep] = useState(0);
  const [gaugeData, setGaugeData] = useState<GaugeData>(INITIAL_DATA);
  const [errors, setErrors] = useState<{ [key in keyof GaugeData]?: string }>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, entities, loading, error } = useSelector(
    (state: RootState) => ({
      entities: state.Entity.entities,
      categories: state.Category.categories,
      loading: state.Category.loading && state.Entity.loading,
      error: state.Category.error || state.Entity.error,
    })
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getEntities());
  }, [dispatch]);

  const validateStep = async (data: GaugeData, schema: any) => {
    try {
      await schema.validate(gaugeData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const newErrors: { [key in keyof GaugeData]?: string } = {};
        err.inner.forEach(error => {
          if (error.path) {
            newErrors[error.path as keyof GaugeData] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNextStep = async (value: any) => {
    setGaugeData(value);
    setCurrentStep(c => Math.min(c + 1, steps.length - 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep(c => Math.max(c - 1, 0));
  };

  const handleCancelForm = () => {
    setCurrentStep(0);
    setGaugeData(INITIAL_DATA);
  }

  const renderFieldError = (fieldName: keyof GaugeData) => {
    if (errors[fieldName]) {
      return (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {errors[fieldName]}
        </p>
      );
    }
    return null;
  };

  const handleSaveData = async () => {
    await createGauge(gaugeData)
      .then(() => {
        toast({
          title: "Gauge Created",
          description: "Gauge created successfully!",
        });
        setGaugeData(INITIAL_DATA);
        navigate('/gauges');
      });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <GeneralStep
            gaugeData={gaugeData}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        );
      case 1:
        return (
          <CategoriesStep
            categories={categories}
            gaugeData={gaugeData}
            validateStep={validateStep}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            renderFieldError={renderFieldError}
          />
        );
      case 2:
        return (
          <EntitiesStep
            entities={entities}
            gaugeData={gaugeData}
            validateStep={validateStep}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            renderFieldError={renderFieldError}
          />
        );
      case 3:
        return (
          <FinalizeStep
            entities={entities}
            categories={categories}
            gaugeData={gaugeData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <PageBreadcrumb title='Manual' name='Manual' />
      <div className="min-h-screen from-blue-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <ProgressBar steps={steps} currentStep={currentStep} />
          {renderStep()}
          {
            (currentStep === 3) &&
            <div className="flex justify-between max-w-3xl mx-auto py-8">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-white text-gray-700 border border-gray px-4 py-2 rounded-md hover:bg-gray-300"
              >
                <ArrowLeft className="inline-block w-4 h-4 mr-2"/>
                Previous step
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveData}
                  className="bg-blue-600 text-white border border-gray px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="bg-white text-gray-700 border border-gray px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default ManualGauge;