import React, {ReactNode, useEffect, useRef} from 'react';

import {
    ITableBody,
    TBodyDataFieldKey,
    TBodyDataID,
    TCollapseEvent
} from '../types';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import DragHandle from '../DragHandle';
import {setForwardedRef} from '../utils';

interface IProps<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    isEnableDragSortable?: boolean
    isCollapse: boolean
    dataRow: ITableBody<K, I>
    isEven: boolean
    collapseEvent: TCollapseEvent
    // children: ReactNode,
    tds: any[]

    timeout?: number; // 控制滑入觸發的秒數
    onHover?: (id: I) => void; // 滑入後超過指定秒數觸發的回調
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

    timeout = 1,
}: IProps<K, I>) => {
    const {
        attributes,
        listeners,
        transform,
        transition,
        setNodeRef,
        isDragging
    } = useSortable({
        id: dataRow.id as string,
        disabled: !isEnableDragSortable,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition
    };



    // 處理Hover事件
    const trRef = useRef<HTMLTableRowElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const trElement = trRef.current;
        if (!trElement || !dataRow.onHoverRow) return;

        const handleMouseEnter = () => {
            timerRef.current = setTimeout(() => {
                if(!dataRow.onHoverRow) return;
                dataRow.onHoverRow(dataRow.id);
            }, timeout * 1000);
        };

        const handleMouseLeave = () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };

        trElement.addEventListener('mouseenter', handleMouseEnter);
        trElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            trElement.removeEventListener('mouseenter', handleMouseEnter);
            trElement.removeEventListener('mouseleave', handleMouseLeave);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeout, dataRow.onHoverRow]);



    /**
     * Render Table td
     */
    const renderTds = () => {
        return tds.map((args, idx) => {
            return <td key={args.key} {...args}/>;
        });
    };


    return <tr
        ref={setForwardedRef(setNodeRef, trRef)}
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
