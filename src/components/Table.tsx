import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="w-full overflow-x-auto my-8">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden border-b border-gray-200 dark:border-gray-700 shadow-md sm:rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            {children}
          </table>
        </div>
      </div>
    </div>
  );
}

export function TableHead({ children }: TableProps) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-700">
      {children}
    </thead>
  );
}

export function TableBody({ children }: TableProps) {
  return (
    <tbody className="bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-50 divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  );
}

export function TableRow({ children }: TableProps) {
  return (
    <tr className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
      {children}
    </tr>
  );
}

export function TableHeader({ children }: TableProps) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
      {children}
    </th>
  );
}

export function TableCell({ children }: TableProps) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
      {children}
    </td>
  );
}
