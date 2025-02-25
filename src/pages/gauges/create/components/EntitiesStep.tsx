import React, { useState } from 'react';
import * as yup from "yup";
import { VerticalForm } from "@/components";
import { Collapse } from "@/components/FrostUI";
import Navigation from "@/components/Navigation.tsx";
import FormCheckList from "@/components/FormCheckList.tsx";
import { GaugeData } from "@/pages/gauges/create";
import { Entity } from "@/redux/entities/reducers.ts";

export const entityStepSchema = yup.object().shape({
  entity_ids: yup.array()
    .min(1, 'At least one entity is required')
    .required('Entity is required'),
});

interface EntitiesStepProps {
  entities: Entity[];
  gaugeData: GaugeData;
  validateStep: any;
  handleNextStep: any;
  handlePreviousStep: any;
  renderFieldError: any;
}

const EntitiesStep: React.FC<EntitiesStepProps> = ({
                                                     entities,
                                                     gaugeData,
                                                     validateStep,
                                                     handleNextStep,
                                                     handlePreviousStep,
                                                     renderFieldError,
                                                   }) => {

  const [entityIds, setEntityIds] = useState<number[]>(gaugeData.entity_ids || []);

  const handleCheckEntity = (e: any, entity: any) => {
    const entityId = entity.id;

    setEntityIds((prevEntityIds) => {
      let updatedEntityIds = [...prevEntityIds];
      if (e.target.checked) {
        if (!updatedEntityIds.includes(entityId)) {
          updatedEntityIds.push(entityId);
        }
      } else {
        updatedEntityIds = updatedEntityIds.filter((id: number) => id !== entityId);
      }
      return updatedEntityIds;
    })
  };

  const handleGaugeData = async () => {
    gaugeData.entity_ids = entityIds;
    const isValid = await validateStep(gaugeData, entityStepSchema);
    if (isValid) {
      handleNextStep(gaugeData);
    }
  };

  return (
    <div className="space-y-4 min-h">
      <VerticalForm onSubmit={handleGaugeData}>
        <div>
          <h1 className="text-black text-lg my-4">Entities</h1>
        </div>
        <div>
          <Collapse defaultOpen={true}>
            <Collapse.Toggle
              openClass="text-primary hover:text-primary"
              className="py-2 inline-flex gap-x-1 w-full font-semibold text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
              as="div"
            >
              <i className="mgc_down_line transition-all text-xl"></i>
              <span>Expand all entities</span>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              {entities.map((entity) => (
                <FormCheckList
                  item={entity}
                  key={`entity-${entity.id}`}
                  itemIds={entityIds}
                  handleCheckItem={handleCheckEntity}
                />
              ))}
            </Collapse.Menu>
          </Collapse>
          {renderFieldError('entity_ids')}
        </div>
        <Navigation handlePreviousStep={handlePreviousStep} />
      </VerticalForm>
    </div>
  );
};

export default EntitiesStep;