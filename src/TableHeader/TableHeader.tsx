import React from 'react';

// Components
import {IOrder, ITitle, TOnChangeSortField} from '../types';
import elClassNames from '../el-class-names';
import {SortDownIcon, SortIcon, SortUpIcon} from '../Icon';


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
            return (
                <th
                    // className={elClassNames.itemColumn}
                    key={`columnTitle_${titleRow.field}`}
                    data-align={titleRow.titleAlign}
                    // style={getCol(titleRow.col)}
                >
                    {titleRow.isEnableSort ? (
                        <button
                            className={elClassNames.headerSortButton}
                            data-active={order?.orderField === titleRow.field}
                            onClick={() => {
                                onChangeSortField({
                                    orderField: titleRow.field,
                                    orderBy: (order?.orderBy === 'DESC' && order.orderField === titleRow.field) ? 'ASC':'DESC',
                                });
                            }}>
                            {titleRow.text}

                            {order?.orderField === titleRow.field ?
                                order?.orderBy === 'ASC' ? <SortUpIcon/> : <SortDownIcon/> :
                                <SortIcon/>
                            }

                        </button>
                    ): titleRow.text}
                </th>
            );
        });

    };


    return <thead
        data-sticky={isStickyHeader}>
        <tr>
            {renderTitle()}
        </tr>
    </thead>;
};

export default TableHeader;


