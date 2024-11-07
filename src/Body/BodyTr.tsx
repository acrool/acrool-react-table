import React, {ReactNode} from 'react';

import {
    ITableBody,
    TBodyDataFieldKey,
    TBodyDataID,
    TCollapseEvent
} from '../types';


interface IProps<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    isCollapse: boolean
    dataRow: ITableBody<K, I>
    isEven: boolean
    collapseEvent: TCollapseEvent,
    children: ReactNode,
}


/**
 * Table Body
 */
const BodyTr = <K extends TBodyDataFieldKey, I extends TBodyDataID>({
    isCollapse,
    dataRow,
    isEven,
    collapseEvent,
    children
}: IProps<K, I>) => {



    return <tr
        data-collapse={isCollapse ? '': undefined}
        onClick={(event) => {
            if(dataRow.onClickRow) {
                dataRow.onClickRow(dataRow.id, () => collapseEvent(event));
            }
        }}
        data-disabled={dataRow.disabled}

        data-even={isEven ? '': undefined}
        role={dataRow.onClickRow ? 'button': undefined}
    >
        {children}
    </tr>;
};

export default BodyTr;
