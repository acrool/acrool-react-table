import React, {ReactNode} from 'react';

import {
    ITableBody,
    TBodyDataFieldKey,
    TBodyDataID,
    TCollapseEvent
} from '../types';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import DragHandle from '../DragHandle';

interface IProps<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    isEnableDragSortable?: boolean
    isCollapse: boolean
    dataRow: ITableBody<K, I>
    isEven: boolean
    collapseEvent: TCollapseEvent
    // children: ReactNode,
    tds: any[]
}


/**
 * Table Body
 */
const BodyTr = <K extends TBodyDataFieldKey, I extends TBodyDataID>({
    isCollapse,
    dataRow,
    isEven,
    isEnableDragSortable,
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
            return <td key={args.key} {...args}/>;
        });
    };


    return <tr
        ref={setNodeRef}
        style={style}


        data-dragging={isDragging ? '': undefined}
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
        {isEnableDragSortable &&
            <td data-drag="">
                <DragHandle
                    {...attributes}
                    {...listeners}
                    isDragging={isDragging}
                />
            </td>
        }

        {renderTds()}
    </tr>;
};

export default BodyTr;
