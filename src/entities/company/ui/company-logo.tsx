"use client";

import { Building2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Company } from "../model/types";

interface CompanyLogoProps {
  company?: Company;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: { container: "w-8 h-8", icon: "w-4 h-4" },
  md: { container: "w-12 h-12", icon: "w-6 h-6" },
  lg: { container: "w-16 h-16", icon: "w-8 h-8" },
};

export function CompanyLogo({
  company,
  size = "md",
  className = "",
}: CompanyLogoProps) {
  const [isError, setIsError] = useState(false);
  const { container, icon } = SIZES[size];

  if (!company?.logoUrl || isError) {
    return (
      <div
        className={`${container} flex items-center justify-center bg-glass-bg rounded-xl ${className}`}
      >
        <Building2 className={`${icon} text-glass-text-muted`} />
      </div>
    );
  }

  return (
    <div
      className={`relative ${container} rounded-xl overflow-hidden ${className}`}
    >
      <Image
        src={company.logoUrl}
        alt={company.name}
        onError={() => setIsError(true)}
        className="object-contain"
        fill
        sizes={size === "lg" ? "64px" : size === "md" ? "48px" : "32px"}
      />
    </div>
  );
}

