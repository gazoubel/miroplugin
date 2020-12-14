const JiraAPI = {
    getBasicInfo(issueKey) {
        return fetch('http://localhost:2990/rest/api/latest/issue/'+issueKey, {method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa('admin:admin')}})
            .then(resp=>resp.json())
            .then(data=>data["fields"]);
    },
    // getSecuredInfo(issueKey) {
    //     return fetch('http://localhost:2990/rest/api/latest/issue/'+issueKey, {method:'GET', 
    //     headers: {'Authorization': 'Basic ' + btoa('admin:admin')}})
    //         .then(resp=>resp.json())
    //         .then(data=>data["fields"])
    //         .then(fields=>{
    //             return {
    //                 Summary: fields['summary'],
    //                 Priority: fields.priority?fields.priority.name:'undefined',
    //                 Assignee: fields.assignee?fields.assignee.name:'undefined',
    //                 Description: fields['description'],
    //             }
    //         });;
    // },
    getSecuredInfo(issueKey) {
        return fetch('http://localhost:2990/rest/api/latest/issue/'+issueKey, {method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa('admin:admin')}})
            .then(resp=>resp.json())
            .then(data=>data["fields"])
            .then(fields=> 
                [
                    {name: 'Summary', value: fields['summary']},
                    {name: 'Priority', value: fields.priority?fields.priority.name:'undefined'},
                    {name: 'Assignee', value:fields.assignee?fields.assignee.name:'undefined'},
                    {name: 'Description', value: fields['description']}
                ]
            );
    },
    getCardDataFromJira(issueKey) {
		return JiraAPI.getBasicInfo(issueKey).then(fields=>{
            return {
                title: fields.summary, 
                clientVisible: true,
                bounds:{height: "400", width:"1200"},
                card: {"customFields":[
                    {"value":fields.status.name,"tooltip":"Status","fieldType":"string","fontColor":"#ffffff","mainColor":"#205081"},
                    {"value":issueKey,"iconUrl":fields.issuetype.iconUrl,"tooltip":"Jira issue ("+fields.issuetype.name+")","fieldType":"string"},
                    {"value":"","iconUrl": fields.priority.iconUrl,"tooltip":fields.priority.name,"fieldType":"string"},
                    {"value":fields.assignee==null?'undefined':fields.assignee.name,"iconUrl":fields.assignee==null?"":fields.assignee.avatarUrl,"tooltip":"Assignee","fieldType":"string","roundedIcon":true}] }
            };
        })
		
	}
}