import React from "react";
import type { ReactNode } from "react";

interface PolicySectionProps {
  id: string;
  title: string;
  number: number;
  children: ReactNode;
  className?: string;
}

const PolicySection: React.FC<PolicySectionProps> = ({
  id,
  title,
  number,
  children,
  className = "",
}) => {
  return (
    <section id={id} className={`mb-12 scroll-mt-24 ${className}`}>
      <h2 className="text-2xl font-semibold text-black mb-4">
        {number}. {title}
      </h2>
      <div className="text-[#404040]">
        {children}
      </div>
    </section>
  );
};

export default PolicySection; 