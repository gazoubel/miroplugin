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
                    {name: 'Assignee', value:fields.assignee?fields.assignee.name:'undefined', row: 2},
                    {name: 'Summary', value: fields['summary'], row:1},
                    {name: 'Priority', value: fields.priority?fields.priority.name:'undefined'},
                    {name: 'Description', value: fields['description']}
                ]
            );
    },
    getImage(priority) {
        // let image = await 
        return '/highest.png';
        // return fetch('http://localhost:2990/rest/engapps/salesforceplugin/getPriorityImage', {method:'GET', headers: {'Authorization': 'Basic ' + btoa('admin:admin')}})
        // .then(image=>{
        //     var blob = new Blob(image, { type: "image/png" });
        //     var url = URL.createObjectURL(blob);
        //     return url;
        // });
        // var blob = new Blob(image, { type: "image/png" });
        // var url = URL.createObjectURL(blob);
        // return url;
    },
    getCardDataFromJira(issueKey) {
        // return this.getImage().then(url=>{
            return JiraAPI.getBasicInfo(issueKey).then(fields=>{
                return {
                    title: fields.summary, 
                    clientVisible: true,
                    bounds:{height: "400", width:"1200"},
                    card: {"customFields":[
                            {"value":fields.status.name,"tooltip":"Status","fieldType":"string","fontColor":"#ffffff","mainColor":"#205081"},
                            {"value":issueKey,"iconUrl":fields.issuetype.iconUrl,"tooltip":"Jira issue ("+fields.issuetype.name+")","fieldType":"string"},
                            {"value":"","iconUrl": this.getImage(fields.priority),"tooltip":fields.priority.name,"fieldType":"string"},
                            // {"value":"","iconUrl": fields.priority.iconUrl,"tooltip":fields.priority.name,"fieldType":"string"},
                            {"value":fields.assignee==null?'undefined':fields.assignee.name,"iconUrl":fields.assignee==null?"":fields.assignee.avatarUrl,"tooltip":"Assignee","fieldType":"string","roundedIcon":true}
                        ] ,
                        "logo":{"iconUrl":"data:image/svg+xml;utf8,<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <image xlink:href=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGcgb3BhY2l0eT0iLjIiPgogICAgICAgIDxwYXRoIGQ9Ik0yMy4wNDIgMEgxMmMwIDEuMzMuNTI1IDIuNjA1IDEuNDYgMy41NDVhNC45NyA0Ljk3IDAgMCAwIDMuNTI1IDEuNDY5aDIuMDM0djEuOTc1QzE5LjAyIDkuNzU2IDIxLjI0OSAxMiAyNCAxMlYuOTY0QS45Ni45NiAwIDAgMCAyMy4wNDIgMHoiLz4KICAgICAgICA8cGF0aCBkPSJNMTcuMDQyIDZINmMwIDEuMzMuNTI1IDIuNjA1IDEuNDYgMy41NDVhNC45NyA0Ljk3IDAgMCAwIDMuNTI1IDEuNDY5aDIuMDM0djEuOTc1QzEzLjAyIDE1Ljc1NiAxNS4yNDkgMTggMTggMThWNi45NjRBLjk2Ljk2IDAgMCAwIDE3LjA0MiA2eiIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMS4wNDIgMTJIMGMwIDEuMzMuNTI1IDIuNjA1IDEuNDYgMy41NDVhNC45NyA0Ljk3IDAgMCAwIDMuNTI1IDEuNDY5aDIuMDM0djEuOTc1QzcuMDIgMjEuNzU2IDkuMjQ5IDI0IDEyIDI0VjEyLjk2NGEuOTYuOTYgMCAwIDAtLjk1OC0uOTY0eiIvPgogICAgPC9nPgo8L3N2Zz4=\" x=\"0\" y=\"0\" height=\"24\" width=\"24\"/>\n</svg>"}
                    }
                };
            })
        // });
	}
}