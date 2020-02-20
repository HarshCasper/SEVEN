const expect = require('expect');

const { Users } = require('../users');

describe('Users', () => {

    var usersObj;

    beforeEach(() => {

        usersObj = new Users();

        usersObj.users = [{
            id: '1',
            name: 'Tian',
            room: 'PANDAS'
        },
        {
            id: '2',
            name: 'Mei',
            room: 'PANDAS'
        },
        {
            id: '3',
            name: 'Aslan',
            room: 'FICTION'
        },
        {
            id: '4',
            name: 'Hedwig',
            room: 'FICTION'
        }]

    });

    it('should add new users', () => {

        var usersObj = new Users();

        var user = {

            id: '123',
            name: 'Pan',
            room: 'PANDA'

        };


        resUser = usersObj.addUser(user.id, user.name, user.room);

        expect(usersObj.users).toEqual([user]);

    });

    it('should remove a user', () => {

        var userID = '1';

        var userToBeRemoved = usersObj.users[0];

        var user = usersObj.removeUser(userID);

        expect(user).toEqual(userToBeRemoved);

        expect(usersObj.getUser(userID)).toNotExist();

    });

    it('should not remove a user', () => {

        var userID = '99';
        var existingUsers = usersObj.users;

        var user = usersObj.removeUser(userID);

        expect(user).toNotExist();

        expect(usersObj.users).toBe(existingUsers);

    });

    it('should find user by ID', () => {

        var userID = '3';

        var user = usersObj.getUser(userID);

        expect(user.id).toBe(userID);

    });

    it('should not find user by ID', () => {

        var userID = '99';

        var user = usersObj.getUser(userID);

        expect(user).toNotExist();


    });

    
    it('should find user by name', () => {

        var userName = 'Tian';

        var user = usersObj.getUserByName(userName);

        expect(user.name).toBe(userName);

    });

    it('should not find user by name', () => {

        var userName = 'BaoBao';

        var user = usersObj.getUserByName(userName);

        expect(user).toNotExist();


    });

    it('should return names for room Pandas', () => {

        var userList = usersObj.getUserList('Pandas');

        expect(userList).toEqual(['Tian', 'Mei']);

    });

    it('should return names for room Fiction', () => {

        var userList = usersObj.getUserList('Fiction');

        expect(userList).toEqual(['Aslan', 'Hedwig']);

    });

    it('should return rooms', () => {

        var roomList = usersObj.getRoomList();

        expect(roomList).toEqual(['PANDAS', 'FICTION']);

    });

    
});