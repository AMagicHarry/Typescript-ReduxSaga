import React from 'react';
import { GaugeData } from "@/pages/gauges/create";
import { Category } from "@/redux/categories/reducers.ts";
import { Entity } from "@/redux/entities/reducers.ts";

interface FinalizeStepProps {
  entities: Entity[];
  categories: Category[];
  gaugeData: GaugeData;
}

const FinalizeStep: React.FC<FinalizeStepProps> = ({ entities, categories, gaugeData }) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-black text-lg my-4">Finalize creating gauges</h1>
        <div
          id="dismiss-alert"
          className='transition duration-300 bg-teal-50 border border-teal-200 rounded-md p-3'
          role="alert"
        >
          <div className="flex items-center gap-3">
            <div className="flex-grow">
              <div className="text-sm text-teal-800 font-medium">
                Do you want to create this gauge?
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-black text-lg my-4">Properties</h1>
        <div>
          <h2 className="my-1 text-black">Name</h2>
          <p className="text-sm min-h-2">{gaugeData.name}</p>
        </div>
        <div>
          <h2 className="my-1 text-black">Description</h2>
          <div className="text-sm min-h-2" dangerouslySetInnerHTML={{ __html: gaugeData.description || '' }} />
        </div>
        <div>
          <h2 className="my-1 text-black">Unit</h2>
          <p className="text-sm min-h-2">{gaugeData.unit}</p>
        </div>
        <div>
          <h2 className="my-1 text-black">Time interval</h2>
          <p className="text-sm min-h-2">{gaugeData.time_interval}</p>
        </div>
        <div>
          <h2 className="my-1 text-black">From</h2>
          <p className="text-sm">{gaugeData.started_on}</p>
        </div>
      </div>
      <div>
        <h1 className="text-black text-lg mt-4 mb-2">Category</h1>
        <div className="min-h-2">
          {gaugeData.category_ids && (
            <div>
              {categories.filter((category) =>
                gaugeData.category_ids.includes(category.id)
              ).map((category) => (
                <p key={`category-${category.id}`}>{category.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-black text-lg mt-4 mb-2">Entity</h1>
        <div className="min-h-2">
          {gaugeData.entity_ids && (
            <div>
              {entities.filter((entity) =>
                gaugeData.entity_ids.includes(entity.id)
              ).map((entity) => (
                <p key={`entity-${entity.id}`}>{entity.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalizeStep;