export interface IUser {
    address: { address1: '', address2: '', pincode: '', city: '', state: '', country: '' },
    email: string,
    enrolledCourses: Array<any>,
    friends: Array<any>,
    name: string,
    password: string,
    phone: string,
    photoUrl: string,
    displayName: string
}
