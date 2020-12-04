const JiraAPI = {
    getBasicInfo(issueKey) {
        return fetch('http://localhost:2990/rest/api/latest/issue/'+issueKey, {method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa('admin:admin')}})
            .then(resp=>resp.json())
            .then(data=>data["fields"]);
    },
    getSecuredInfo(issueKey) {
        return fetch('http://localhost:2990/rest/api/latest/issue/'+issueKey, {method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa('admin:admin')}})
            .then(resp=>resp.json())
            .then(data=>data["fields"]);
    }
}