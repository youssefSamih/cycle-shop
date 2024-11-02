'use client';

import { Column, useTable } from 'react-table';

// ~~~~~~ Types

interface DarkTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

// ~~~~~~ Component

export const DarkTable = <T extends object>({
  columns,
  data,
}: DarkTableProps<T>) => {
  // ~~~~~~ Hooks

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // ~~~~~~ Render

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full border-collapse border border-gray-700"
        >
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={headerGroupIndex}
                className="bg-gray-800"
              >
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    {...column.getHeaderProps()}
                    key={columnIndex}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-700"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-gray-900">
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={rowIndex}
                  className="hover:bg-gray-700"
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-b border-gray-700"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
