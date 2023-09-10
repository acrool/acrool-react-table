import React from 'react';

import {IOrder, ITitle, TOnChangeSortField, TTitleField} from '../types';


interface IProps<D extends string> {
    title: TTitleField<D>,
    onChangeSortField?: TOnChangeSortField;
    isStickyHeader?: boolean;
    order?: IOrder,
}


/**
 * Table Header
 */
const TableHeader = <D extends string>({
    title,
    order,
    isStickyHeader = false,
    onChangeSortField = () => {},
}: IProps<D>) => {

    const renderTitle = () => {
        return Object.keys(title).map(titleKey => {
            const titleRow = title[titleKey];
            const isEnableSort = titleRow.isEnableSort;
            const sortType = order?.orderField === titleKey && order?.orderBy === 'ASC' ? 'ascending':
                order?.orderField === titleKey && order?.orderBy === 'DESC' ? 'descending':
                    undefined;

            return (
                <th
                    key={`columnTitle_${titleKey}`}
                    data-align={titleRow.titleAlign}
                    aria-sort={sortType}
                    data-enable-sort={isEnableSort ? '': undefined}
                    onClick={isEnableSort ? () => {
                        onChangeSortField({
                            orderField: titleKey,
                            orderBy: (order?.orderBy === 'DESC' && order.orderField === titleKey) ? 'ASC':'DESC',
                        });
                    }: undefined}
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


