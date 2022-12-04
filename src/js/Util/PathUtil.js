import AlertService from "../Service/Alert/AlertService";

export default class PathUtil {
    constructor() { 
        this.alertService = new AlertService();
    }

    loadId() {
        const path = window.location.toString();
        const id = path.substring(path.lastIndexOf('/')+1);
        if(!id) {
            this.alertService.showAlert('Error', 'There is no Id.');
            setTimeout(() => window.location = '', 2000);
        }
        return id;
    }
}