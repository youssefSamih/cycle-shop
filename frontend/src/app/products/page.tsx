'use client';

import React, { ReactNode, useState } from 'react';
import { Column } from 'react-table';

import { DarkTable } from '../components/table';
import { PageWrapper } from '../components/page-wrapper';
import { Button } from '../components/ui/button';
import { ProductForm } from '../components/product-form';

// ~~~~~~ Types

interface Product {
  name: string;
  price: string;
  action: ReactNode;
}

// ~~~~~~ Component

function Products() {
  // ~~~~~~ States

  const [isProductFormOpen, setIsProductFormOpen] = useState(false);

  // ~~~~~~ Handlers

  function toggleProductForm() {
    setIsProductFormOpen((prevState) => !prevState);
  }

  // ~~~~~~ Computed

  const columns: Column<Product>[] = React.useMemo(
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
        Header: 'Action',
        accessor: 'action',
      },
    ],
    []
  );

  const data: Product[] = React.useMemo(
    () => [
      {
        name: 'Product 1',
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
      {
        name: 'Product 2',
        price: '$15',
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
      {
        name: 'Product 3',
        price: '$20',
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
      <ProductForm isOpen={isProductFormOpen} onClose={toggleProductForm} />

      <div className="container mx-auto mt-[100px]">
        <div className="ml-[16px]">
          <Button size="sm" variant="primary" onClick={toggleProductForm}>
            Add product
          </Button>
        </div>
        <DarkTable<Product> columns={columns} data={data} />
      </div>
    </PageWrapper>
  );
}

export default Products;
