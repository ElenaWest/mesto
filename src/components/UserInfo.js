export default class UserInfo {
    constructor(info) {
        this._profileName = document.querySelector(info.profileNameSelector);
        this._profileStatus = document.querySelector(info.profileStatusSelector);
        this._profileAvatar = document.querySelector(info.profileAvatar)
    }

    getUserInfo() {
        return {username: this._profileName.textContent, status: this._profileStatus.textContent}
    }

    setUserInfo({ username, status, avatar }) {
        this._profileName.textContent = username;
        this._profileStatus.textContent = status;
        this._profileAvatar.src = avatar;
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }
}