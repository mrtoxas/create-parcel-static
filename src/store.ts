const store: Store = {
  projectInitData: {} as ProjectInitData,
  userProjectChoiсe: {} as UserProjectChoiсes,
  finallyMsgs: [] as string[],

  setUserChoiсe: function (data) {
    this.userProjectChoiсe = data;
  },
  setProjectInitData: function (data) {
    this.projectInitData = data;
  },
};

export { store };
