export interface IMenu {
  name: string,
  href?: string,
  children?: IMenu[],
}

export const menu = (): IMenu[] => {
    return [
        {name: 'BaseUsed', href: '/'},
    ];

};
