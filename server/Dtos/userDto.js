module.exports = class userDto {
    id;
    username;
    avatar;

    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.avatar = user.avatar;
    }
}