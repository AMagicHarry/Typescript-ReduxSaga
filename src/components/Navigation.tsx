import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import React from "react";


interface NavigationProps {
  handlePreviousStep: any
}

const Navigation: React.FC<NavigationProps> = ({ handlePreviousStep }) => {
  return (
    <div className="flex justify-between max-w-3xl mx-auto py-8">
      <button
        type="button"
        onClick={handlePreviousStep}
        className="bg-white text-gray-700 border border-gray px-4 py-2 rounded-md hover:bg-gray-300"
      >
        <ArrowLeft className="inline-block w-4 h-4 mr-2"/>
        Previous step
      </button>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        <>Next Step <ArrowRight className="inline-block w-4 h-4 ml-2"/></>
      </button>
    </div>
  );
}

export default Navigation;