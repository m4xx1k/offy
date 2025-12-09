import { cn } from "@/lib/utils";
import Image from "next/image";

export const VacancySource = ({ source }: { source: "dou" | "djinni" }) => {
  const variants = {
    dou: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-300",
      img: "/dou.png",
      label: "DOU",
    },
    djinni: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      text: "text-purple-300",
      img: "/djinni.png",
      label: "Djinni",
    },
  };

  const v = variants[source];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold ${v.bg} ${v.border} ${v.text}`}
    >
      <Image
        src={v.img}
        alt={v.label}
        width={16}
        height={16}
        className={cn("rounded-sm contain", source === "dou" && "bg-black")}
      />
      <span>{v.label}</span>
    </div>
  );
};
