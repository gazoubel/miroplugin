

let lastSelectedWidgetId
let widgetName = document.querySelector('#widget-name')
let widgetInfo = document.querySelector('.widget-info')
let description = document.querySelector('#description')
let placeholder = document.querySelector('.no-selected-widget')

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
        const fields = await JiraAPI.getSecuredInfo(issueKey);
        showElement(widgetInfo);
        hideElement(placeholder);
        lastSelectedWidgetId = selectedWidget.id;
        widgetName.innerText = "Secure Info for "+issueKey;
        fields.sort((a,b)=>{
          if(!a.row && !b.row) return 0;
          if(a.row && !b.row) return -1;
          if(!a.row && b.row) return 1;
          if(a.row<b.row) return -1;
          if(a.row>b.row) return 1;
          return 0;
        }).forEach(field=>{
          var descriptionHeaderElement = document.createElement("div");
          descriptionHeaderElement.style.cssText="margin-top: 7px;";
          
          var descriptionHeaderElementBold = document.createElement("b");
          var descriptionHeaderText = document.createTextNode(field.name);
          descriptionHeaderElementBold.appendChild(descriptionHeaderText);
          descriptionHeaderElement.appendChild(descriptionHeaderElementBold);
          widgetInfo.appendChild(descriptionHeaderElement);

          var descriptionElement = document.createElement("div");
          var descriptionText = document.createTextNode(field.value);
          descriptionElement.appendChild(descriptionText);
          widgetInfo.appendChild(descriptionElement);
        });
    } else {
        showElement(placeholder);
        hideElement(widgetInfo);
    }
})
