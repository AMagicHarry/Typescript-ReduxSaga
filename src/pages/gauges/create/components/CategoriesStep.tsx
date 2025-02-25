import React, { useState } from 'react';
import * as yup from "yup";
import { VerticalForm } from "@/components";
import { Collapse } from "@/components/FrostUI";
import Navigation from "@/components/Navigation.tsx";
import FormCheckList from "@/components/FormCheckList.tsx";
import { Category } from "@/redux/categories/reducers.ts";
import { GaugeData } from "@/pages/gauges/create";

export const categoryStepSchema = yup.object().shape({
  category_ids: yup.array()
    .min(1, 'At least one category is required')
    .required('Category is required'),
});

interface CategoriesStepProps {
  categories: Category[];
  gaugeData: GaugeData;
  validateStep: any;
  handleNextStep: any;
  handlePreviousStep: any;
  renderFieldError: any;
}

const CategoriesStep: React.FC<CategoriesStepProps> = ({
                                                         categories,
                                                         gaugeData,
                                                         validateStep,
                                                         handleNextStep,
                                                         handlePreviousStep,
                                                         renderFieldError,
                                                       }) => {
  const [categoryIds, setCategoryIds] = useState<number[]>(gaugeData.category_ids || []);

  const handleCheckCategory = (category: Category) => {
    setCategoryIds([category.id]);
  };

  const handleGaugeData = async () => {
    gaugeData.category_ids = categoryIds;
    const isValid = await validateStep(gaugeData, categoryStepSchema);
    if (isValid) {
      handleNextStep(gaugeData);
    }
  };

  return (
    <div className="space-y-4 min-h">
      <VerticalForm onSubmit={handleGaugeData}>
        <div>
          <h1 className="text-black text-lg my-4">Categories</h1>
        </div>
        <div>
          <Collapse defaultOpen={true} >
            <Collapse.Toggle
              openClass="text-primary hover:text-primary"
              className="py-2 inline-flex gap-x-1 w-full font-semibold text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
              as="div"
            >
              <i className="mgc_down_line transition-all text-xl"></i>
              <span>Expand all categories</span>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              {categories.map((category) => (
                <FormCheckList
                  key={`category-${category.id}`}
                  item={category}
                  itemIds={categoryIds}
                  handleCheckItem={() => handleCheckCategory(category)}
                />
              ))}
            </Collapse.Menu>
          </Collapse>
          {renderFieldError('category_ids')}
        </div>
        <Navigation handlePreviousStep={handlePreviousStep} />
      </VerticalForm>
    </div>
  );
};

export default CategoriesStep;