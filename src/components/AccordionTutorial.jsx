import React from "react";

const AccordionTutorial = ({ label, tutorial }) => {
  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title font-semibold">{label}</div>
      <div className="collapse-content text-sm">{tutorial}</div>
    </div>
  );
};

export default AccordionTutorial;
