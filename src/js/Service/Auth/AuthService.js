

import FormService from "../Form/FormService";
import APIService from "../API/APIService";
import AlertService from "../Alert/AlertService";

export default class AuthService {
    constructor() { }

    async login(loginForm) {
        // instantiate objects
        const formService = new FormService();
        const apiService = new APIService();
        // build request
        const jsonFormData = formService.buildJsonFormData(loginForm);
        jsonFormData.email = jsonFormData.username; // backend accepts username AND email
        const headers = formService.buildHeaders();
        // Execute request
        const response = await apiService.POST(`${window.GlobalVariables.API_URL}/api/auth/login`, headers, jsonFormData);
        if(response.success) {
            // Save user data
            const user = response.result.user;
            localStorage.setItem("user", JSON.stringify(user));
            // return user
            return user;
        }
        else
            throw new Error(`${response.result.message}`);
    }

    logout() {
        localStorage.clear();
        history.pushState({}, '', '/');
    }

    isLoggedIn() {
        const user = localStorage.getItem("user");
        return (user == undefined || user == null);
    }

    logoutUnauthorizedUser(evt) {
        const alertService = new AlertService();
        alertService.showAlert("Information", "You have been signed out. Please sign back in.");
        setTimeout(() => this.logout(), 1500);
    }

    notifyForbiddenUser(evt) {
        const alertService = new AlertService();
        alertService.showAlert("Information", "You are not authorized to view this content.");
    }
}