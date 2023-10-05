import {asset} from '../utils';

export interface IPaginateData {
    id: number,
    name: string,
    email: string,
    role: string,
    isJoined: boolean,
    createdAt: string,
    avatar: string,
    amount: number,
    subAmount: number,
}

export const data: IPaginateData[] = [
    {id: 1, name: 'Jack Wu', email: 'jackUu@test.com', role: 'Admin', isJoined: true, createdAt: '2022-12-14 00:12:00',  avatar: asset('/sample/avatar/female-1.jpg'), amount: 200, subAmount: 300},
    {id: 2, name: 'Imagine Chiu', email: 'imagineChiu@test.com', role: 'Guest', isJoined: true, createdAt: '2022-12-15 11:02:00', avatar: asset('/sample/avatar/female-2.jpg'), amount: 99, subAmount: 400},
    {id: 3, name: 'Jason Dinwiddie', email: 'jsonDinwiddie@test.com', role: 'Manage', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-3.jpg'), amount: 880, subAmount: 200},
    {id: 4, name: 'Gloria Lu', email: 'groriaLu@test.com', role: 'Guest', isJoined: true, createdAt: '2022-12-11 10:12:00', avatar: asset('/sample/avatar/female-4.jpg'), amount: 12300, subAmount: 340},

    {id: 5, name: 'Adam Bolton', email: 'adamBolton@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-5.jpg'), amount: 2500, subAmount: 3020},
    {id: 6, name: 'Stanley McQueen', email: 'stanleyMcQueen@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-6.jpg'), amount: 200, subAmount: 500},
    {id: 7, name: 'Bryson White', email: 'brysonWhite@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-7.jpg'), amount: 200, subAmount: 310},
    {id: 8, name: 'Joe Bieber', email: 'joeBieber@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-8.jpg'), amount: 200, subAmount: 400},
    {id: 9, name: 'Gabriel Hampden', email: 'sabrielHampden@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-9.jpg'), amount: 200, subAmount: 350},
    {id: 10, name: 'Adrian Huang', email: 'adrianHuang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-10.jpg'), amount: 200, subAmount: 200},
    {id: 11, name: 'Felix Huang', email: 'felixHuang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-11.jpg'), amount: 2200, subAmount: 600},
    {id: 12, name: 'Gary Chien', email: 'garyChien@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-12.jpg'), amount: 200, subAmount: 400},
    {id: 13, name: 'Keira Hsiao', email: 'keiraHsiao@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-13.jpg'), amount: 2330, subAmount: 400},
    {id: 14, name: 'Morris Wang', email: 'morrisWang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-14.jpg'), amount: 200, subAmount: 400},
    {id: 15, name: 'Nick Yang', email: 'nickYang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-15.jpg'), amount: 120, subAmount: 400},
    {id: 16, name: 'Wayne Chen', email: 'wayneChen@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-16.jpg'), amount: 550, subAmount: 400},
    {id: 17, name: 'NtdGamers電玩咖', email: 'ntdGamers@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-17.jpg'), amount: 470, subAmount: 400},
    {id: 18, name: 'Kwun Hung Mak', email: 'kwunHungMak@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-18.jpg'), amount: 200, subAmount: 400},
    {id: 19, name: 'Daro Hang', email: 'daroHang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-19.jpg'), amount: 200, subAmount: 400},
    {id: 20, name: 'Monica Camilleri', email: 'monicaCamilleri@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-20.jpg'), amount: 200, subAmount: 400},
    {id: 21, name: 'Drian Huang', email: 'drianHuang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-21.jpg'), amount: 200, subAmount: 400},
    {id: 22, name: 'Alix Huang', email: 'alixHuang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-22.jpg'), amount: 200, subAmount: 400},
    {id: 23, name: 'Ary Chien', email: 'aryChien@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-23.jpg'), amount: 200, subAmount: 400},
    {id: 24, name: 'Eira Hsiao', email: 'eiraHsiao@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-24.jpg'), amount: 200, subAmount: 400},
    {id: 25, name: 'Orris Wang', email: 'orrisWang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-25.jpg'), amount: 200, subAmount: 400},
    {id: 26, name: 'Ick Yang', email: 'ickYang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-26.jpg'), amount: 200, subAmount: 400},
    {id: 27, name: 'Ayne Chen', email: 'ayneChen@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-27.jpg'), amount: 200, subAmount: 400},
    {id: 28, name: 'TdGamers', email: 'tdGamers@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-28.jpg'), amount: 200, subAmount: 400},
    {id: 29, name: 'Hung Mak', email: 'hungMak@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-29.jpg'), amount: 200, subAmount: 400},
    {id: 30, name: 'Aro Hang', email: 'aroHang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-30.jpg'), amount: 200, subAmount: 400},
    {id: 31, name: 'Onica Camilleri', email: 'onicaCamilleri@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-31.jpg'), amount: 200, subAmount: 400},
    {id: 32, name: 'Orris Wang', email: 'orrisWang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-25.jpg'), amount: 200, subAmount: 400},
    {id: 33, name: 'Ick Yang', email: 'ickYang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-26.jpg'), amount: 200, subAmount: 400},
    {id: 34, name: 'Ayne Chen', email: 'ayneChen@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-27.jpg'), amount: 200, subAmount: 400},
    {id: 35, name: 'TdGamers', email: 'tdGamers@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-28.jpg'), amount: 200, subAmount: 400},
    {id: 36, name: 'Hung Mak', email: 'hungMak@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-29.jpg'), amount: 200, subAmount: 400},
    {id: 37, name: 'Aro Hang', email: 'aroHang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-30.jpg'), amount: 200, subAmount: 400},
    {id: 38, name: 'Onica Camilleri', email: 'onicaCamilleri@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/sample/avatar/female-31.jpg'), amount: 200, subAmount: 400},
];
//
// export const data: IPaginateData[][] = [
//     paginateData1,
//     paginateData2,
//     paginateData3,
//     paginateData4,
// ];
// export const dataTotal = [
//     ...paginateData1,
//     ...paginateData2,
//     ...paginateData3,
//     ...paginateData4,
// ].length;
