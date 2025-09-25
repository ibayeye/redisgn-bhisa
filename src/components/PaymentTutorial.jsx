import React from "react";
import AccordionTutorial from "./AccordionTutorial";

const PaymentTutorial = ({ paymentMethods, activeMethod }) => {
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-800 mb-4">Tutorial Pembayaran</h4>
      <div className="space-y-2">
        {Object.entries(paymentMethods[activeMethod].tutorials).map(
          ([bank, steps]) => (
            <AccordionTutorial
              key={bank}
              label={`Tutorial ${bank}`}
              tutorial={
                <ol className="space-y-2">
                  {steps.map((step, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-[#e33320] font-medium">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default PaymentTutorial;
