const store: Store = {
  projectData: {
    projectPath: undefined,
    projectName: undefined,
    packageName: undefined,
    whetherToClear: false,
  },
  userProjectChoiсe: {
    markup: undefined,
    style: undefined,
    script: undefined,
  },
  setUserChoiсe: function (key, value) {
    this.userProjectChoiсe[key] = value;
  },
  setProjectData: function(data) {
    console.log(this); // { setProjectData: [Function: setProjectData] }
    // this.projectData = data; 
  },
}; 

export { store };
