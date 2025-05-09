import {DraggableAttributes} from '@dnd-kit/core';

import styles from '../styles.module.scss';
import Dragging from './dragging.svg?react';


interface IProps extends DraggableAttributes{
    isDragging: boolean
}

const DragHandle = ({
    isDragging,
    ...props
}: IProps) => {
    return <div
        className={styles.dragHandle}
        data-dragging={isDragging ? '': undefined}
        {...props}
    >
        <Dragging height={20} width={20}/>
    </div>;
};

export default DragHandle;





