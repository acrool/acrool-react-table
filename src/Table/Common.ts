import styled, {css} from 'styled-components/macro';
import {Col, Row} from 'bear-react-grid';
import config from './config';


export const FormControl = styled.div`
  > div{
      border-bottom-color: transparent;
      border-radius: 0;
  }

  :last-child > div{
      border-bottom-color: rgba(33,33,33,.14);
  }
`;


export const ItemColumn = styled.div<{
    align?: 'left'|'center'|'right'
    vertical?: 'top'|'center'|'bottom'
}>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    height: 100%;
    font-size: 14px;
    padding: 0 ${config.padding}px;
    flex-wrap: nowrap;

    word-break: break-all;
    transition: color .1s;
    //overflow: hidden;
    //*{
    //  user-select: text;
    //}

    ${props => props.align === 'right' && css`
        align-items: flex-end;
    `}
    ${props => props.align === 'left' && css`
        align-items: flex-start;
    `}
    ${props => props.align === 'center' && css`
        align-items: center;
    `}

    ${props => props.vertical === 'top' && css`
        justify-content: flex-start;
    `}
    ${props => props.vertical === 'bottom' && css`
        justify-content: flex-end;
    `}
    ${props => props.vertical === 'center' && css`
        justify-content: center;
    `}
`;


export const HeaderLi = styled.div<{
    isTitle?: boolean;
    noGutters?: boolean;
    isNonLine?: boolean;
    col?: boolean,
}>`
    height: 37px;
    list-style: none;
    //position: relative;
    color: #9aa0ac;
    font-size: 14px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    border-bottom: 1px solid #585858;
  
    padding: 0 -${config.padding}px;

    ${props => props.isNonLine && css`
        border-color: transparent;
    `}


`;


export const ItemUl = styled.ul`
  margin: 0;
`;
