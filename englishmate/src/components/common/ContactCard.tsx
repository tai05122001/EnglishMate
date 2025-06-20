import React from "react";
import { Card } from "../ui/card";

interface ContactInfo {
  email: string;
  address: string;
  phone: string;
}

interface ContactCardProps {
  contactInfo: ContactInfo;
  className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  contactInfo, 
  className = "" 
}) => {
  return (
    <Card className={`bg-[#FAFAFA] border-gray-200 p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <span className="font-semibold text-[#404040]">Email:</span>
          <span className="text-[#404040]">{contactInfo.email}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-[#404040]">Address:</span>
          <span className="text-[#404040]">{contactInfo.address}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-[#404040]">Phone:</span>
          <span className="text-[#404040]">{contactInfo.phone}</span>
        </div>
      </div>
    </Card>
  );
};

export default ContactCard; 