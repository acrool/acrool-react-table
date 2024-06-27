import {TTableTitle, TBodyDataFieldKey, TBodyDataDetail, TBodyDataField, TCollapseEvent} from '../types';
import {getCalcStickyLeftStyles, getColSpanStyles} from '../utils';
import {objectKeys} from 'bear-jsutils/object';
import {
    getFooterClassNameConfig,
    getFooterColSpanConfig,
    getFooterConfig,
    getFooterStickyLeftConfig
} from '../Footer/utils';
import {ReactNode} from 'react';


interface IProps <K extends TBodyDataFieldKey>{
    title: TTableTitle<K>
    data: JSX.Element | TBodyDataDetail<K>[]
}








/**
 * Table Body Detail
 * 額外顯示資訊 例如 詳細
 */
const BodyDetail = <K extends TBodyDataFieldKey>({
    title,
    data,
}: IProps<K>) => {

    /**
     * 取得資料內容
     * @param field
     * @param isActive
     * @param collapse
     */
    const getBodyDetailData = (field: TBodyDataField<K>[K]) => {

        if(typeof field === 'boolean'){
            return String(field);
        }

        if(typeof field === 'object' && field !== null && 'value' in field){
            return field.value;
        }

        return field as ReactNode;
    };


    if(Array.isArray(data)){
        const content = data.map((dataRow, index) => {

            const colSpanConfig = getFooterColSpanConfig(title, data);
            const stickyLeftConfig = getFooterStickyLeftConfig(title, data);

            const titleKeys = objectKeys(title);
            const tds = titleKeys
                ?.filter(titleKey => !title[titleKey].isHidden)
                ?.reduce((curr: JSX.Element[], titleKey, idx) => {
                    const datDetailField = dataRow[titleKey];
                    const config = getFooterConfig(datDetailField);
                    const titleRow = title[titleKey];


                    const fieldConfig = {
                        ...titleRow,
                        ...config,
                    };



                    const colSpan = colSpanConfig?.[index]?.[titleKey];

                    // 被合併為 undefined
                    if(typeof colSpan === 'undefined'){
                        return curr;
                    }

                    const stickyLeft = stickyLeftConfig?.[index]?.[titleKey];
                    // const children = datDetailField?.value;
                    const children = getBodyDetailData(datDetailField);

                    const colSpanStyles = getColSpanStyles(colSpan);
                    const stickyLeftStyles = getCalcStickyLeftStyles(stickyLeft, titleRow.isSticky);

                    const args = {
                        key: `tfootTd_${index}_${titleKey}`,
                        className: getFooterClassNameConfig(datDetailField),
                        'aria-label': typeof titleRow.text === 'string' ? titleRow.text: '',
                        'data-align': fieldConfig?.dataAlign,
                        'data-vertical': fieldConfig.dataVertical,
                        'data-sticky': titleRow.isSticky ? '': undefined,
                        colSpan: colSpan > 1 ? colSpan: undefined,
                        style: {
                            ...colSpanStyles,
                            ...stickyLeftStyles,
                        },
                        children,
                    };
                    return [
                        ...curr,
                        <td {...args}/>,
                    ];
                }, []);

            return (<tr
                key={`tfootTr_${index}`}
            >
                {tds}
            </tr>);
        });

        return <>
            {content}
        </>;
    }


    // 單純資料(非列表)
    const colSpanStyles = getColSpanStyles(objectKeys(title).length);
    return <tr data-collapse="">
        <td style={colSpanStyles}>
            {data as ReactNode}
        </td>
    </tr>;

};

export default BodyDetail;
