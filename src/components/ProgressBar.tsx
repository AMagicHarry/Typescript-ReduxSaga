import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  title: string;
  icon: React.ElementType;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center w-full">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${index < currentStep
                ? 'border-green-600 text-green-600'
                : (index === currentStep ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300 bg-gray-300 text-white')
              }`}
            >
              {index < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <p
              className={`mt-2 text-sm font-medium ${index <= currentStep ? 'text-indigo-600' : 'text-gray-500'}`}
            >
              {step.title}
            </p>
            {index < steps.length && (
              <div
                className={`hidden sm:block w-full h-[2px] mt-5 
                  ${index <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;