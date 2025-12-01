// src/app/vacancies/[id]/_components/job-description.tsx
import ReactMarkdown from "react-markdown";

interface VacancyDescriptionProps {
  content: string;
}

export const VacancyDescription = ({ content }: VacancyDescriptionProps) => {
  return (
    <div className="glass-panel p-8 rounded-2xl">
      <div
        className="prose prose-invert max-w-none 
        prose-headings:font-bold prose-headings:text-indigo-400
        prose-a:text-purple-400 hover:prose-a:text-purple-300
        prose-li:marker:text-indigo-500
        prose-strong:text-white"
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};
