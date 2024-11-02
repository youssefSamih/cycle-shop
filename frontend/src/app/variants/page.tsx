'use client';

import React, { ReactNode, useState } from 'react';
import { PageWrapper } from '../components/page-wrapper';
import { Button } from '../components/ui/button';
import { DarkTable } from '../components/table';
import { Column } from 'react-table';
import { VariantForm } from '../components/variant-form';

// ~~~~~~ Types

interface VariantType {
  name: string;
  price: string;
  productType: string;
  action: ReactNode;
}

// ~~~~~~ Component

function VariantsPage() {
  // ~~~~~~ States

  const [isVariantFormOpen, setIsVariantFormOpen] = useState(false);

  // ~~~~~~ Handlers

  function toggleVariantForm() {
    setIsVariantFormOpen((prevState) => !prevState);
  }

  // ~~~~~~ Computed

  const columns: Column<VariantType>[] = React.useMemo(
    () => [
      {
        Header: 'Product Name',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Product type',
        accessor: 'productType',
      },
      {
        Header: 'Action',
        accessor: 'action',
      },
    ],
    []
  );

  const data: VariantType[] = React.useMemo(
    () => [
      {
        name: 'Variant 1',
        productType: 'Product 1',
        price: '$10',
        action: (
          <div className="flex gap-3">
            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              View
            </button>

            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Edit
            </button>

            <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // ~~~~~~ Render

  return (
    <PageWrapper keepHeaderSolid>
      <VariantForm isOpen={isVariantFormOpen} onClose={toggleVariantForm} />

      <div className="container mx-auto mt-[100px]">
        <div className="ml-[16px]">
          <Button size="sm" variant="primary" onClick={toggleVariantForm}>
            Add variant
          </Button>
        </div>
        <DarkTable<VariantType> columns={columns} data={data} />
      </div>
    </PageWrapper>
  );
}

export default VariantsPage;
