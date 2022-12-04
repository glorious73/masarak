

export default class AlertService {
    constructor() {

    }

    showAlert(status, message) {
        GlobalVariables.ALERT_STATUS = status;
        GlobalVariables.ALERT_MESSAGE = message;
        document.dispatchEvent(new CustomEvent('toggleAlert'));
    }
}