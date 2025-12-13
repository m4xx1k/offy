import { flexRender, Table as TanStackTable } from "@tanstack/react-table";
import { ScrollArea, ScrollBar } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface DataTableProps<T> {
  table: TanStackTable<T>;
  className?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  table,
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <ScrollArea className={cn("h-[420px] -mx-2 px-2", className)}>
      <table className="w-full min-w-max relative border-separate border-spacing-0">
        <thead className="sticky top-0 bg-slate-900/90 backdrop-blur-md z-20 shadow-sm shadow-black/10 rounded-t-2xl">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-white/10">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left min-w-max py-3 px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider first:pl-2 last:pr-2 first:rounded-tl-lg last:rounded-tr-lg"
                  style={{
                    width: header.getSize() !== 150 ? header.getSize() : "auto",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="[&_tr:last-child_td:first-child]:rounded-bl-lg [&_tr:last-child_td:last-child]:rounded-br-lg">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              className="min-w-max border-b border-white/5 hover:bg-white/3 transition-colors group"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-3 px-3 text-sm first:pl-2 last:pr-2 align-top"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
