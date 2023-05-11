export default class UserInfo {
    constructor(info) {
        this._profileName = document.querySelector(info.profileNameSelector);
        this._profileStatus = document.querySelector(info.profileStatusSelector);
    }

    getUserInfo() {
        return {username: this._profileName.textContent, status: this._profileStatus.textContent}
    }

    setUserInfo(user) {
        this._profileName.textContent = user.username;
        this._profileStatus.textContent = user.status;
    }
}