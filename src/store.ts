const store: Store = {
  projectInitData: {} as ProjectInitData,
  userProjectChoiсe: {} as UserProjectChoiсes,
  warnMsgs: [] as string[],

  setUserChoiсe: function (data) {
    this.userProjectChoiсe = data;
  },
  setProjectInitData: function (data) {
    this.projectInitData = data;
  },
  setWarnMsgs: function (data) {
    this.warnMsgs.push(data);
  },
};

export { store };
