"use client";

import { POKEMON_TYPES, TYPE_COLORS } from "@/lib/constants";

interface TypeFilterProps {
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  onClearAll: () => void;
}

export default function TypeFilter({
  selectedTypes,
  onToggleType,
  onClearAll,
}: TypeFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filter by Type</h3>
        {selectedTypes.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-primary hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {POKEMON_TYPES.map((type) => {
          const isSelected = selectedTypes.includes(type);
          return (
            <button
              key={type}
              onClick={() => onToggleType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? "text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={
                isSelected
                  ? { backgroundColor: TYPE_COLORS[type] }
                  : undefined
              }
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
