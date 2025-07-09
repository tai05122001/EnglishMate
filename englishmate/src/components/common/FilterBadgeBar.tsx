import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FilterOption {
    value: string;
    label: string;
}

interface FilterGroupProps {
    label: string;
    options: FilterOption[];
    selectedValue: string;
    onChange: (value: string) => void;
}

interface FilterBadgeBarProps {
    filters: FilterGroupProps[];
    className?: string;
}

const FilterBadgeBar: React.FC<FilterBadgeBarProps> = ({
    filters,
    className = "",
}) => {
    return (
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${className}`}>
            {filters.map((filter, index) => (
                <div key={index} className="flex flex-wrap items-center gap-4">
                    <span className="text-gray-700 font-semibold mr-2 whitespace-nowrap text-sm">
                        {filter.label}
                    </span>
                    <div className="flex gap-1 py-1 px-1 rounded-md bg-[#F5F5F5]">
                        {filter.options.map((option) =>
                            filter.selectedValue === option.value ? (
                                <Badge
                                    key={option.value}
                                    variant="default"
                                    className="px-4 py-2 cursor-pointer text-sm bg-transparent text-gray-900 whitespace-nowrap hover:bg-transparent hover:outline-none focus:outline-none"
                                    onClick={() => filter.onChange(option.value)}
                                >
                                    {option.label}
                                </Badge>
                            ) : (
                                <Button
                                    key={option.value}
                                    variant="ghost"
                                    size="sm"
                                    className="px-4 py-2 text-gray-400 hover:text-black text-sm bg-transparent hover:bg-transparent hover:outline-none hover:border-none focus:outline-none focus:border-none focus-visible:border-none"
                                    onClick={() => filter.onChange(option.value)}
                                >
                                    {option.label}
                                </Button>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilterBadgeBar; 