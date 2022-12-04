
import FormService from "../Form/FormService";
import APIService from "../API/APIService";
import ExportService from "../Export/ExportService";

export default class CRUDService {
    constructor() {

    }

    async addItem(apiEndpoint, addForm) {
        // instantiate objects
        const formService = new FormService();
        const apiService = new APIService();
        // build form
        const jsonFormData = formService.buildJsonFormData(addForm);
        // headers
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const headers     = formService.buildHeaders(`Bearer ${currentUser.token}`);
        // Execute request
        const response = await apiService.POST(`${window.GlobalVariables.API_URL}${apiEndpoint}`, headers, jsonFormData);
        if(response.success)
            return response.result;
        else
            throw new Error(`${response.result.message}`);
    }

    async editItem(apiEndpoint, itemId, editForm) {
        // instantiate objects
        const formService = new FormService();
        const apiService = new APIService();
        // build form
        const jsonFormData = formService.buildJsonFormData(editForm);
        // headers
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const headers     = formService.buildHeaders(`Bearer ${currentUser.token}`);
        // Execute request
        const response = await apiService.PUT(`${window.GlobalVariables.API_URL}${apiEndpoint}/${itemId}`, headers, jsonFormData);
        if(response.success)
            return response.result;
        else
            throw new Error(`${response.result.message}`);
    }

    async getItemById(apiEndpoint, id) {
        // instantiate objects
        const formService = new FormService();
        const apiService = new APIService();
        // build request
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const headers = formService.buildHeaders(`Bearer ${currentUser.token}`);
        // Execute request
        const response = await apiService.GET(`${window.GlobalVariables.API_URL}${apiEndpoint}/${id}`, headers);
        if(response.success)
            return response.result;
        else
            throw new Error(`${response.result.message}`);
    }

    async getItems(apiEndpoint, query) {
        // instantiate objects
        const formService = new FormService();
        const apiService = new APIService();
        // build request
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const headers = formService.buildHeaders(`Bearer ${currentUser.token}`);
        // Execute request
        const response = await apiService.GET(`${window.GlobalVariables.API_URL}${apiEndpoint}`, headers, query);
        if(response.success) {
            const items = response.result;
            return items;
        }
        else {
            throw new Error(`${response.result.message}`);
        }
    }

    async getItemsForm(apiEndpoint, queryForm) {
        // instantiate objects
        const formService = new FormService();
        const apiService = new APIService();
        // build query
        const query = (queryForm) ? formService.buildJsonFormData(queryForm) : null;
        // build request
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const headers = formService.buildHeaders(`Bearer ${currentUser.token}`);
        // Execute request
        const response = await apiService.GET(`${window.GlobalVariables.API_URL}${apiEndpoint}`, headers, query);
        if(response.success) {
            const items = response.result;
            return items;
        }
        else
            throw new Error(`${response.result.message}`);
    }

    async deleteItem(apiEndpoint, itemId) {
        // instantiate objects
        const formService = new FormService();
        const apiService = new APIService();
        // headers
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const headers     = formService.buildHeaders(`Bearer ${currentUser.token}`);
        // Execute request
        const response = await apiService.DELETE(`${window.GlobalVariables.API_URL}${apiEndpoint}/${itemId}`, headers);
        if(response.success)
            return response.result;
        else
            throw new Error(`${response.result.message}`);
    }

    /**
     * Export items to CSV.
     * Gets items from api in batches, concatenates them, and exports the final list
     * Returns 0 when done, or -1 if there are no items
     */
    async exportItems(apiEndpoint, batchSize, responseEntity, fileName) {
        try {
            // setup
            const { totalItems } = await this.getItems(apiEndpoint, null);
            const numIterations = Math.ceil(totalItems/batchSize);
            // get list
            let items = [];
            for (let i = 0; i < numIterations; i++) {
                const pagination = { pageNumber: i+1, pageSize: batchSize };
                const result = await this.getItems(apiEndpoint, pagination);
                if(result[responseEntity].length > 0)
                   items = items.concat(result[responseEntity]);
            }
            // export list
            if(items.length > 0) {
                const exportService = new ExportService();
                exportService.exportToCSV(items, `${fileName}.csv`);
                return 0;
            }
            else
                return -1;
        }
        catch(err) {
            throw new Error(err);
        }
    }
}