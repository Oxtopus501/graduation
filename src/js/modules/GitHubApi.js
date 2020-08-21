export class GitHubApi {
    constructor(repo) {
        this.repo = repo;
    }

    getCommits() {
        return fetch (`https://api.github.com/repos/${this.repo}/commits` + `?q=per_page=20&page=1}`)
        .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(new Error(res.status));
        })
        
        .catch((err) => Promise.reject(new Error(err.message)));
    }
}