export class NewsApi {
    constructor(baseUrl,apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }
    getNews(query, dateFrom) {    
        return fetch(`${this.baseUrl}` +
        `q=${query}&` +
        `from=${dateFrom}&` +
        'pageSize=100&' +
        `${this.apiKey}`)
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(new Error(res.status));
            })
            .catch((err) => Promise.reject(new Error(err.message)));

    }
}