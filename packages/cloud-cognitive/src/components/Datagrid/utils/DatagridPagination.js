/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Pagination } from 'carbon-components-react';

export const DatagridPagination = ({ state, setPageSize, gotoPage, totalItemCount, rows }) => {
  const updatePagination = ({ page, pageSize }) => {
    console.log(state);
    setPageSize(pageSize);
    gotoPage(page - 1); // Carbon is non-zero-based
  };

  return (
    <Pagination
      page={state.pageIndex + 1} // react-table is zero-based
      pageSize={state.pageSize}
      pageSizes={state.pageSizes || [10, 20, 30, 40, 50]}
      totalItems={totalItemCount ?? rows.length}
      onChange={updatePagination}
    />
  );
};
