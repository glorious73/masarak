export default class SidebarService {
    constructor() { }

    isDisplayedForRole(roles) {
        const user = JSON.parse(localStorage.getItem("user"));
        let isDisplayedForRole = false;
        if(user) {
            for(const role of roles.split(","))
                if(role.toLowerCase() == user.role.toLowerCase())
                    isDisplayedForRole = true;
        }
        return isDisplayedForRole;
    }
}