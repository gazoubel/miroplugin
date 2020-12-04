let lastSelectedWidgetId
let widgetName = document.querySelector('#widget-name')
let widgetInfo = document.querySelector('.widget-info')
let description = document.querySelector('#description')
let placeholder = document.querySelector('.no-selected-widget')

// const jiraApi = require('./JiraAPI')
function showElement(el) {
  el.style.display = 'block'
}

function hideElement(el) {
  el.style.display = 'none'
}

hideElement(placeholder)
hideElement(widgetInfo)

miro.onReady(async () => {
    const appId = await miro.getClientId();
    const appIdKey = appId.toString();

    let selectedWidgets = await miro.board.selection.get();
    let selectedWidget = selectedWidgets[0]
    if (selectedWidgets.length === 1) {
        let issueKey = selectedWidget.metadata[appIdKey].issueKey;
        // const jiraIssue = await fetch('http://localhost:2990/rest/api/latest/issue/'+issueKey, {method:'GET', 
        // headers: {'Authorization': 'Basic ' + btoa('admin:admin')}}).then(resp=>resp.json());
        // const fields = jiraIssue["fields"];
        const fields = await JiraAPI.getSecuredInfo(issueKey);
        showElement(widgetInfo);
        hideElement(placeholder);
        lastSelectedWidgetId = selectedWidget.id;
        widgetName.innerText = "Secure Info for "+issueKey;
        description.innerHTML = fields.description;
    } else {
        showElement(placeholder);
        hideElement(widgetInfo);
    }
})
