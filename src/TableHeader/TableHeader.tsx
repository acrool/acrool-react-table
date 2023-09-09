import React from 'react';

import {IOrder, ITitle, TOnChangeSortField} from '../types';


interface IProps {
    title: ITitle[],
    onChangeSortField?: TOnChangeSortField;
    isStickyHeader?: boolean;
    order?: IOrder,
}


/**
 * Table Header
 */
const TableHeader = ({
    title= [],
    order,
    isStickyHeader = false,
    onChangeSortField = () => {},
}: IProps) => {

    const renderTitle = () => {
        return title.map(titleRow => {
            const isEnableSort = titleRow.isEnableSort;
            const sortType = order?.orderField === titleRow.field && order?.orderBy === 'ASC' ? 'ascending':
                order?.orderField === titleRow.field && order?.orderBy === 'DESC' ? 'descending':
                    undefined;

            return (
                <th
                    key={`columnTitle_${titleRow.field}`}
                    data-align={titleRow.titleAlign}
                    aria-sort={sortType}
                    data-enable-sort={isEnableSort ? '': undefined}
                    onClick={() => {
                        onChangeSortField({
                            orderField: titleRow.field,
                            orderBy: (order?.orderBy === 'DESC' && order.orderField === titleRow.field) ? 'ASC':'DESC',
                        });
                    }}
                >
                    {titleRow.text}
                </th>
            );
        });

    };


    return <thead
        data-sticky={isStickyHeader ? '': undefined}
    >
        <tr>
            {renderTitle()}
        </tr>
    </thead>;
};

export default TableHeader;


