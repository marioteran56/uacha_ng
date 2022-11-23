export class User {
    private fullName: String;
    private email: String;
    private gender: String;
    private birthDate: Date;
    private description: String;
    private userName: String;
    private password: String;

    constructor(fullName: String, email: String, gender: String, birthDate: Date, description: String, userName: String, password: String) {
        this.fullName = fullName;
        this.email = email;
        this.gender = gender;
        this.birthDate = birthDate;
        this.description = description;
        this.userName = userName;
        this.password = password;
    }

    getFullName() {
        return this.fullName;
    }

    setFullName(fullName: String) {
        this.fullName = fullName;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email: String) {
        this.email = email;
    }

    getGender() {
        return this.gender;
    }

    setGender(gender: String) {
        this.gender = gender;
    }

    getBirthDate() {
        return this.birthDate;
    }

    setBirthDate(birthDate: Date) {
        this.birthDate = birthDate;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description: String) {
        this.description = description;
    }

    getUserName() {
        return this.userName;
    }

    setUserName(userName: String) {
        this.userName = userName;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password: String) {
        this.password = password;
    }

}
