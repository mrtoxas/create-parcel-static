import { ProjectInitData, Store, UserProject } from 'types';

const store: Store = {
  projectInitData: {} as ProjectInitData,
  userChoice: {} as UserProject,
  warnMsgs: [] as string[],

  setUserChoiсe: function (data) {
    this.userChoice = data;
  },

  setProjectInitData: function (data) {
    this.projectInitData = data;
  },

  setWarnMsgs: function (data) {
    this.warnMsgs.push(data);
  },

  getUserChoice: function () {
    return this.userChoice;
  },
};

export { store };
