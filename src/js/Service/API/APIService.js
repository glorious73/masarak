export default class APIService {
    constructor() {

    }

    async GET(fetchLink, headers, query=null) {
        if(!fetchLink || !headers) {
            throw new Error("One or more GET request parameters was not passed.");
        }
        try {
            const url = new URL(fetchLink);
            if(query)
                url.search = new URLSearchParams(query).toString();
            const rawResponse = await fetch(url, {
                method: "GET",
                headers: headers
            });
            this._CheckResponseStatus(rawResponse);
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch GET: ${err}`);
            throw err;
        }
    }

    async POST(fetchLink, headers, body) {
        if(!fetchLink || !headers || !body) {
            throw new Error("One or more POST request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });
            this._CheckResponseStatus(rawResponse);
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch POST: ${err}`);
            throw err;
        }
    }

    async PUT(fetchLink, headers, body) {
        if(!fetchLink || !headers || !body) {
            throw new Error("One or more PUT request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(body)
            });
            this._CheckResponseStatus(rawResponse);
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch PUT: ${err}`);
            throw err;
        }
    }

    async DELETE(fetchLink, headers) {
        if(!fetchLink || !headers) {
            throw new Error("One or more DELETE request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "DELETE",
                headers: headers
            });
        this._CheckResponseStatus(rawResponse);
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch DELETE: ${err}`);
            throw err;
        }
    }

    _CheckResponseStatus(response) {
        if(response.status == '401')
            document.dispatchEvent(new CustomEvent("UnauthorizedEvent"));
        if(response.status == '403')
            document.dispatchEvent(new CustomEvent("ForbiddenEvent"));
    }
}