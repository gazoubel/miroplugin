export default function JiraAPI() {
    return {
        getBasicInfo(issueKey) {
            const jiraIssue = await fetch('http://localhost:2990/rest/api/latest/issue/'+issueKey, {method:'GET', 
            headers: {'Authorization': 'Basic ' + btoa('admin:admin')}}).then(resp=>resp.json());
            const fields = jiraIssue["fields"];
            return fields;
        },
        getSecuredInfo(issueKey) {
            const jiraIssue = await fetch('http://localhost:2990/rest/api/latest/issue/'+issueKey, {method:'GET', 
            headers: {'Authorization': 'Basic ' + btoa('admin:admin')}}).then(resp=>resp.json());
            const fields = jiraIssue["fields"];
            return fields;
        }
    }
}