import React from "react";

const Card = ({
  src,
  alt,
  title,
  description,
  price,
  type,
  objectFit = "fill",
  sizeText,
  height,
  variant = "default",
  center = "text-center",
}) => {
  return (
    <div className="card bg-base-100 w-full h-80 shadow-sm flex flex-col cursor-pointer hover:transform hover:scale-105 transition-transform duration-200">
      <figure className="h-70 overflow-hidden ">
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-${objectFit}`}
        />
      </figure>
      <div className="card-body flex-1 p-4">
        <h2
          className={`card-title font-semibold line-clamp-2 overflow-hidden ${height} ${sizeText} ${center}`}
        >
          {title}
        </h2>

        {variant === "default" && (
          <>
            {description && (
              <p className="text-md text-gray-600">{description}</p>
            )}
            <div className="card-actions justify-start items-center mt-auto">
              {price && (
                <div className="font-semibold text-lg text-[#e33320]">
                  {price}
                </div>
              )}
              {type && (
                <div className="font-medium text-md text-gray-500">{type}</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
