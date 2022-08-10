import {asset} from '../../config/utils';

export interface IPaginateData {
    id: number,
    name: string,
    email: string,
    role: string,
    isJoined: boolean,
    createdAt: string,
    avatar: string,
}

const paginateData1: IPaginateData[] = [
    {id: 1, name: 'Jack Wu', email: 'jackUu@test.com', role: 'Admin', isJoined: true, createdAt: '2022-12-14 00:12:00',  avatar: asset('/images/avatar/female-1.jpg')},
    {id: 2, name: 'Imagine Chiu', email: 'imagineChiu@test.com', role: 'Guest', isJoined: true, createdAt: '2022-12-15 11:02:00', avatar: asset('/images/avatar/female-2.jpg')},
    {id: 3, name: 'Jason Dinwiddie', email: 'jsonDinwiddie@test.com', role: 'Manage', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-3.jpg')},
    {id: 4, name: 'Gloria Lu', email: 'groriaLu@test.com', role: 'Guest', isJoined: true, createdAt: '2022-12-11 10:12:00', avatar: asset('/images/avatar/female-4.jpg')},

    {id: 5, name: 'Adam Bolton', email: 'adamBolton@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-5.jpg')},
    {id: 6, name: 'Stanley McQueen', email: 'stanleyMcQueen@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-6.jpg')},
    {id: 7, name: 'Bryson White', email: 'brysonWhite@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-7.jpg')},
    {id: 8, name: 'Joe Bieber', email: 'joeBieber@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-8.jpg')},
];
const paginateData2: IPaginateData[] = [
    {id: 9, name: 'Gabriel Hampden', email: 'sabrielHampden@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-9.jpg')},
    {id: 10, name: 'Adrian Huang', email: 'adrianHuang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-10.jpg')},
    {id: 11, name: 'Felix Huang', email: 'felixHuang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-11.jpg')},
    {id: 12, name: 'Gary Chien', email: 'garyChien@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-12.jpg')},
    {id: 13, name: 'Keira Hsiao', email: 'keiraHsiao@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-13.jpg')},
    {id: 14, name: 'Morris Wang', email: 'morrisWang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-14.jpg')},
    {id: 15, name: 'Nick Yang', email: 'nickYang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-15.jpg')},
    {id: 16, name: 'Wayne Chen', email: 'wayneChen@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-16.jpg')},
];
const paginateData3: IPaginateData[] = [
    {id: 17, name: 'NtdGamers電玩咖', email: 'ntdGamers@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-17.jpg')},
    {id: 18, name: 'Kwun Hung Mak', email: 'kwunHungMak@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-18.jpg')},
    {id: 19, name: 'Daro Hang', email: 'daroHang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-19.jpg')},
    {id: 20, name: 'Monica Camilleri', email: 'monicaCamilleri@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-20.jpg')},
    {id: 21, name: 'Drian Huang', email: 'drianHuang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-21.jpg')},
    {id: 22, name: 'Alix Huang', email: 'alixHuang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-22.jpg')},
    {id: 23, name: 'Ary Chien', email: 'aryChien@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-23.jpg')},
    {id: 24, name: 'Eira Hsiao', email: 'eiraHsiao@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-24.jpg')},
];

const paginateData4: IPaginateData[] = [
    {id: 25, name: 'Orris Wang', email: 'orrisWang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-25.jpg')},
    {id: 26, name: 'Ick Yang', email: 'ickYang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-26.jpg')},
    {id: 27, name: 'Ayne Chen', email: 'ayneChen@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-27.jpg')},
    {id: 28, name: 'TdGamers', email: 'tdGamers@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-28.jpg')},
    {id: 29, name: 'Hung Mak', email: 'hungMak@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-29.jpg')},
    {id: 30, name: 'Aro Hang', email: 'aroHang@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-30.jpg')},
    {id: 31, name: 'Onica Camilleri', email: 'onicaCamilleri@test.com', role: 'Guest', isJoined: false, createdAt: '2022-12-12 12:14:00', avatar: asset('/images/avatar/female-31.jpg')},
];

export const data: IPaginateData[][] = [
    paginateData1,
    paginateData2,
    paginateData3,
    paginateData4,
];
export const dataTotal = [
    ...paginateData1,
    ...paginateData2,
    ...paginateData3,
    ...paginateData4,
].length;