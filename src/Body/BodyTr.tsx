import React, {ReactNode} from 'react';

import {
    ITableBody,
    TBodyDataFieldKey,
    TBodyDataID,
    TCollapseEvent
} from '../types';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

interface IProps<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    isCollapse: boolean
    dataRow: ITableBody<K, I>
    isEven: boolean
    collapseEvent: TCollapseEvent,
    // children: ReactNode,
    tds: any[],
}


/**
 * Table Body
 */
const BodyTr = <K extends TBodyDataFieldKey, I extends TBodyDataID>({
    isCollapse,
    dataRow,
    isEven,
    collapseEvent,
    tds,
}: IProps<K, I>) => {
    const {
        attributes,
        listeners,
        transform,
        transition,
        setNodeRef,
        isDragging
    } = useSortable({
        id: dataRow.id as string
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition
    };


    const renderTds = () => {
        return tds.map((args, idx) => {
            // if(isDragging){
            //     return <td key={args.key} style={{background: '#ccc'}}>&nbsp;</td>;
            // }

            if(idx === 0){
                return <td key={args.key} {...args}>
                    <div {...attributes} {...listeners}>:::</div>
                    {args.children}
                </td>;
            }
            return <td key={args.key} {...args}/>;
        });
    };

    // {...attributes}
    // {...listeners}

    return <tr
        ref={setNodeRef}
        style={style}


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
        {renderTds()}
    </tr>;
};

export default BodyTr;
