import FormService from "../Form/FormService";
import APIService from "../API/APIService";

export default class PasswordService {
    constructor() { }

    async sendResetPasswordEmail(forgotPasswordForm) {
        // instantiate objects
        const formService = new FormService();
        const apiService  = new APIService();
        // build request
        const jsonFormData = formService.buildJsonFormData(forgotPasswordForm);
        const headers      = formService.buildHeaders();
        // Execute request
        const response = await apiService.POST(`${window.GlobalVariables.API_URL}/api/auth/forgotPassword`, headers, jsonFormData);
        if(response.success)
            return response.result;
        else
            throw new Error(`${response.result.message}`);
    }

    async resetPassword(resetPasswordForm) {
        // instantiate objects
        const formService = new FormService();
        const apiService  = new APIService();
        // build request
        const jsonFormData = formService.buildJsonFormData(resetPasswordForm);
        const headers      = formService.buildHeaders();
        // Execute request
        const response = await apiService.PUT(`${window.GlobalVariables.API_URL}/api/auth/resetPassword`, headers, jsonFormData);
        if(response.success)
            return response.result;
        else
            throw new Error(`${response.result.message}`);
    }
}