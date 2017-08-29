import React from "react";
import { Router } from "dva/router";

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: "/",
      name: "app",
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/app'));
          cb(null, require('./routes/app'));
        });
      },
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, { component: require('./routes/IndexPage') })
        })
      },
      childRoutes: [
        // {
        //   path: "contractList",
        //   name: "ContractList",
        //   getComponent(nextState, cb) {
        //     require.ensure([], require => {
        //       registerModel(app, require("./models/contractList"));
        //       cb(null, require("./routes/contractList"));
        //     });
        //   }
        // },
        // {
        //   path: "createContract",
        //   name: "createContract",
        //   getComponent(nextState, cb) {
        //     require.ensure([], require => {
        //       registerModel(app, require("./models/createContract"));
        //       cb(null, require("./routes/createContract"));
        //     });
        //   }
        // },
        // {
        //   path: "editContract",
        //   name: "editContract",
        //   getComponent(nextState, cb) {
        //     require.ensure([], require => {
        //       registerModel(app, require("./models/editContract"));
        //       cb(null, require("./routes/editContract"));
        //     });
        //   }
        // },
        {
          path: "officeManageList",
          name: "officeManageList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/officeManage/officeManageList")
              );
              cb(null, require("./routes/officeManage/officeManageList"));
            });
          }
        },
        {
          path: "createDocumentCategory",
          name: "createDocumentCategory",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/officeManage/createDocumentCategory")
              );
              cb(null, require("./routes/officeManage/createDocumentCategory"));
            });
          }
        },
        {
          path: "editDocumentCategory",
          name: "editDocumentCategory",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/officeManage/editDocumentCategory")
              );
              cb(null, require("./routes/officeManage/editDocumentCategory"));
            });
          }
        },
        {
          path: "planTypeList",
          name: "planTypeList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/planTypeCategory/planTypeList")
              );
              cb(null, require("./routes/planTypeCategory/planTypeList"));
            });
          }
        },
        {
          path: "createPlanType",
          name: "createPlanType",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/planTypeCategory/createPlanType")
              );
              cb(null, require("./routes/planTypeCategory/createPlanType"));
            });
          }
        },
        {
          path: "editPlanType",
          name: "editPlanType",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/planTypeCategory/editPlanType")
              );
              cb(null, require("./routes/planTypeCategory/editPlanType"));
            });
          }
        },
        {
          path: "meetingCategoryList",
          name: "meetingCategoryList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/meetingCategoryManage/meetingCategoryList")
              );
              cb(
                null,
                require("./routes/meetingCategoryManage/meetingCategoryList")
              );
            });
          }
        },
        {
          path: "createMeetingCategory",
          name: "createMeetingCategory",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/meetingCategoryManage/createMeetingCategory")
              );
              cb(
                null,
                require("./routes/meetingCategoryManage/createMeetingCategory")
              );
            });
          }
        },
        {
          path: "editMeetingCategory",
          name: "editMeetingCategory",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/meetingCategoryManage/editMeetingCategory")
              );
              cb(
                null,
                require("./routes/meetingCategoryManage/editMeetingCategory")
              );
            });
          }
        },
        {
          path: "documentList",
          name: "documentList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/document/documentList"));
              cb(null, require("./routes/document/documentList"));
            });
          }
        },
        {
          path: "createDocument",
          name: "createDocument",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/document/createDocument"));
              cb(null, require("./routes/document/createDocument"));
            });
          }
        },
        {
          path: "editDocument",
          name: "editDocument",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/document/editDocument"));
              cb(null, require("./routes/document/editDocument"));
            });
          }
        },
        {
          path: "showDocument",
          name: "showDocument",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/document/showDocument"));
              cb(null, require("./routes/document/showDocument"));
            });
          }
        },
        {
          path: "createDocument",
          name: "createDocument",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/document/createDocument"));
              cb(null, require("./routes/document/createDocument"));
            });
          }
        },
        {
          path: "editDocument",
          name: "editDocument",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/document/editDocument"));
              cb(null, require("./routes/document/editDocument"));
            });
          }
        },
        {
          path: "showDocument",
          name: "showDocument",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/document/showDocument"));
              cb(null, require("./routes/document/showDocument"));
            });
          }
        },

        {
          path: "meeting",
          name: "meeting",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/meeting/meeting"));
              cb(null, require("./routes/meeting/meeting"));
            });
          }
        },
        {
          path: "createMeeting",
          name: "createMeeting",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/meeting/createMeeting"));
              cb(null, require("./routes/meeting/createMeeting"));
            });
          }
        },
        {
          path: "viewMeeting",
          name: "viewMeeting",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/meeting/viewMeeting"));
              cb(null, require("./routes/meeting/viewMeeting"));
            });
          }
        },
        {
          path: "editMeeting",
          name: "editMeeting",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require("./models/meeting/editMeeting"));
              cb(null, require("./routes/meeting/editMeeting"));
            });
          }
        },
        {
          path: "workingPlanList",
          name: "workingPlanList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/workingPlanManage/workingPlanList")
              );
              cb(null, require("./routes/workingPlanManage/workingPlanList"));
            });
          }
        },
        {
          path: "createWorkingPlan",
          name: "createWorkingPlan",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/workingPlanManage/createWorkingPlan")
              );
              cb(null, require("./routes/workingPlanManage/createWorkingPlan"));
            });
          }
        },
        {
          path: "editWorkingPlan",
          name: "editWorkingPlan",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/workingPlanManage/editWorkingPlan")
              );
              cb(null, require("./routes/workingPlanManage/editWorkingPlan"));
            });
          }
        },
        {
          path: "watchWorkingPlan",
          name: "watchWorkingPlan",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/workingPlanManage/watchWorkingPlan")
              );
              cb(null, require("./routes/workingPlanManage/watchWorkingPlan"));
            });
          }
        },

        {
          path: "securityEquipMentList",
          name: "securityEquipMentList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/securityEquipMentManage/securityEquipMentList")
              );
              cb(
                null,
                require("./routes/securityEquipMentManage/securityEquipMentList")
              );
            });
          }
        },
        {
          path: "createSecurityEquipMent",
          name: "createSecurityEquipMent",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/securityEquipMentManage/createSecurityEquipMent")
              );
              cb(
                null,
                require("./routes/securityEquipMentManage/createSecurityEquipMent")
              );
            });
          }
        },

        {
          path: "editSecurityEquipMent",
          name: "editSecurityEquipMent",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/securityEquipMentManage/editSecurityEquipMent")
              );
              cb(
                null,
                require("./routes/securityEquipMentManage/editSecurityEquipMent")
              );
            });
          }
        },

        {
          path: "watchSecurityEquipMent",
          name: "watchSecurityEquipMent",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/securityEquipMentManage/watchSecurityEquipMent")
              );
              cb(
                null,
                require("./routes/securityEquipMentManage/watchSecurityEquipMent")
              );
            });
          }
        },
        {
          path: "workAttendanceList",
          name: "workAttendanceList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/workAttendanceManage/workAttendanceList")
              );
              cb(
                null,
                require("./routes/workAttendanceManage/workAttendanceList")
              );
            });
          }
        },
        {
          path: "showOrEditWorkAttendance",
          name: "showOrEditWorkAttendance",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/workAttendanceManage/showOrEditWorkAttendance")
              );
              cb(
                null,
                require("./routes/workAttendanceManage/showOrEditWorkAttendance")
              );
            });
          }
        },
        {
          path: "securityEventsList",
          name: "securityEventsList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/securityEventsManage/securityEventsList")
              );
              cb(
                null,
                require("./routes/securityEventsManage/securityEventsList")
              );
            });
          }
        },
        {
          path: "visitorRegistrationList",
          name: "visitorRegistrationList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/visitorRegistrationManage/visitorRegistrationList")
              );
              cb(
                null,
                require("./routes/visitorRegistrationManage/visitorRegistrationList")
              );
            });
          }
        },

        {
          path: "articleRegistrationList",
          name: "articleRegistrationList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/articleRegistrationManage/articleRegistrationList")
              );
              cb(
                null,
                require("./routes/articleRegistrationManage/articleRegistrationList")
              );
            });
          }
        },
        {
          path: "securityPositionList",
          name: "securityPositionList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/securityPositionManage/securityPositionList")
              );
              cb(
                null,
                require("./routes/securityPositionManage/securityPositionList")
              );
            });
          }
        },
        {
          path: "showOrEditSecurityPosition",
          name: "showOrEditSecurityPosition",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/securityPositionManage/showOrEditSecurityPosition")
              );
              cb(
                null,
                require("./routes/securityPositionManage/showOrEditSecurityPosition")
              );
            });
          }
        },
        {
          path: "securityDutyPlanList",
          name: "securityDutyPlanList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/securityDutyPlanManage/securityDutyPlanList")
              );
              cb(
                null,
                require("./routes/securityDutyPlanManage/securityDutyPlanList")
              );
            });
          }
        },

        {
          path: "securityScheduleList",
          name: "securityScheduleList",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(
                app,
                require("./models/securityScheduleManage/securityScheduleList")
              );
              cb(
                null,
                require("./routes/securityScheduleManage/securityScheduleList")
              );
            });
          }
        },


        {
            path: '/cleaningAreaList',
            name: 'cleaningAreaList',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/cleaningAreaManage/cleaningAreaList'));
                    cb(null, require('./routes/cleaningAreaManage/cleaningAreaList'));
                });
            },
        },
        {
            path: '/cleaningRecordList',
            name: 'cleaningRecordList',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/cleaningRecordManage/cleaningRecordList'));
                    cb(null, require('./routes/cleaningRecordManage/cleaningRecordList'));
                });
            },
        },
        {
            path: '/cleaningInspectList',
            name: 'cleaningInspectList',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/cleaningInspectManage/cleaningInspectList'));
                    cb(null, require('./routes/cleaningInspectManage/cleaningInspectList'));
                });
            },
        },
        {
            path: '/cleaningToolList',
            name: 'cleaningToolList',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/cleaningToolManage/cleaningToolList'));
                    cb(null, require('./routes/cleaningToolManage/cleaningToolList'));
                });
            },
        },
        {
            path: '/showOrEditCleaningTool',
            name: 'showOrEditCleaningTool',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/cleaningToolManage/showOrEditCleaningTool'));
                    cb(null, require('./routes/cleaningToolManage/showOrEditCleaningTool'));
                });
            },
        },

        {
            path: '/createApproval',
            name: 'createApproval',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/approvalManage/createApproval'));
                    cb(null, require('./routes/approvalManage/createApproval'));
                });
            },
        },
        {
            path: '/initiatedList',
            name: 'initiatedList',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/approvalManage/initiatedList'));
                    cb(null, require('./routes/approvalManage/initiatedList'));
                });
            },
        },
        {
            path: '/pendingApprovalList',
            name: 'pendingApprovalList',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/pendingApprovalManage/pendingApprovalList'));
                    cb(null, require('./routes/pendingApprovalManage/pendingApprovalList'));
                });
            },
        },
        {
            path: '/approvedList',
            name: 'approvedList',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/pendingApprovalManage/approvedList'));
                    cb(null, require('./routes/pendingApprovalManage/approvedList'));
                });
            },
        },

        {
            path: '/sendApprovalList',
            name: 'sendApprovalList',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/pendingApprovalManage/sendApprovalList'));
                    cb(null, require('./routes/pendingApprovalManage/sendApprovalList'));
                });
            },
        },
        {
            path: '/showApproval',
            name: 'showApproval',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/approvalManage/showApproval'));
                    cb(null, require('./routes/approvalManage/showApproval'));
                });
            },
        },

      ]
    }
  ];
  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
