import React, { useState } from "react";

// Example shades using hex colors
const shades = [
  { color: "#D1A192" },
  { color: "#B87665" },
  { color: "#C96D8E" },
  { color: "#BB5A69" },
  { color: "#E18C72" },
  { color: "#B45442" },
  { color: "#DB6A7B" },
  { color: "#A95053" },
  { color: "#8E3C3A" },
  { color: "#CC8872" },
  { color: "#AD6954" },
  { color: "#D16671", isUnavailable: true }, // Example unavailable
  { color: "#E4A58A" },
  { color: "#CC6A6B" },
  { color: "#B17C73" },
  { color: "#D48F8A" },
  { color: "#A05D5C" },
  { color: "#C3837B" },
  { color: "#E39184" },
  { color: "#9C4A47" },
  { color: "#B55D74" },
  { color: "#D47963" },
  { color: "#A66863" },
  { color: "#7D3B3A", isUnavailable: true }
];


const ShadeSelector = () => {
    const [selectedShade, setSelectedShade] = useState(0);

    return (
        <div>
            {/* Shade name */}
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm">
                    <span className="font-medium">Color:</span>{" "}
                    {shades[selectedShade]?.name || `Shade ${selectedShade + 1}`}
                </p>
                <p className="text-sm text-[#92132f] cursor-pointer hover:underline">
                    Find my shade
                </p>
            </div>

            {/* Colored divs (swatches) */}
            <div className="flex flex-wrap gap-2">
                {shades.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => !item.isUnavailable && setSelectedShade(index)}
                        style={{ backgroundColor: item.color }}
                        className={`h-8 w-8 rounded cursor-pointer transition-all duration-200
              ${selectedShade === index ? "border-[2px] border-black" : "border border-gray-200"}
              ${item.isUnavailable ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}
            `}
                    >
                        {/* Slash for unavailable */}
                        {item.isUnavailable && (
                            <div className="relative h-full w-full">
                                <div className="absolute inset-0 w-full h-[1px] bg-white rotate-45"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShadeSelector;
