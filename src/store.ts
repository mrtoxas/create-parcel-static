import { ProjectInitData, Store, UserProject } from 'types';

const store: Store = {
  projectInitData: {} as ProjectInitData,
  userProjectChoice: {} as UserProject,
  warnMsgs: [] as string[],

  setUserChoiсe: function (data) {
    this.userProjectChoice = data;
  },
  setProjectInitData: function (data) {
    this.projectInitData = data;
  },
  setWarnMsgs: function (data) {
    this.warnMsgs.push(data);
  },
};

export { store };
