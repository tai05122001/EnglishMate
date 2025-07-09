import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChevronDown } from "lucide-react";

interface FilterOption {
    value: string;
    label: string;
}

interface FilterBarProps {
    icon?: React.ReactNode;
    searchPlaceholder?: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    filters: {
        name: string;
        label: string;
        options: FilterOption[];
        value: string;
        onChange: (value: string) => void;
    }[];
    onReset: () => void;
    className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
    icon,
    searchPlaceholder = "Search...",
    searchValue,
    onSearchChange,
    filters,
    onReset,
    className = "",
}) => {
    return (
        <div className={`bg-white rounded-xl shadow p-4 flex flex-col md:flex-row items-center gap-4 relative ${className}`}>
            {/* Icon */}
            {icon && (
                <div className="hidden md:flex items-center justify-center w-10 h-10 bg-[#e0f7f5] rounded-full mr-2">
                    {icon}
                </div>
            )}

            {/* Search input with icon */}
            <div className="relative flex-1 w-full">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#02b2a4] text-gray-700"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Filter icon */}
            <span className="text-gray-400">
                <Filter size={20} />
            </span>

            {/* Filter dropdowns */}
            {filters.map((filter) => (
                <div key={filter.name} className="relative flex items-center gap-1">
                    {filter.label && <span className="text-gray-500 text-sm">{filter.label}</span>}
                    <div className="relative flex items-center">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#02b2a4]">
                            <ChevronDown size={16} />
                        </span>
                        <select
                            value={filter.value}
                            onChange={(e) => filter.onChange(e.target.value)}
                            className="border border-gray-200 rounded-lg px-7 py-2 focus:outline-none focus:ring-2 focus:ring-[#02b2a4] min-w-[100px] appearance-none"
                        >
                            {filter.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}

            {/* Reset button */}
            <Button
                variant="outline"
                className="ml-2 border-[#02b2a4] text-[#02b2a4] hover:bg-[#e0f7f5]"
                onClick={onReset}
            >
                Reset
            </Button>
        </div>
    );
};

export default FilterBar; 