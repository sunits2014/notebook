export interface IUser {
    address: { main: '', city: '', state: '', postal: '' },
    email: string,
    enrolledCourses: Array<any>,
    friends: Array<any>,
    name: string,
    password: string,
    phone: string,
    photoUrl: string,
    displayName: string
}
