const store: Store = {
  projectInitData: undefined,
  userProjectChoiсe: undefined,
  finallyMsgs: [] as string[],
  
  setUserChoiсe: function (data) {
    this.userProjectChoiсe = data;
  },
  setProjectInitData: function(data) {
    this.projectInitData = data; 
  },
}; 

export { store };