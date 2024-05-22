const TODO_TYPE = {
  TODAY_TODO: 'todayToDo',
  TODAY_TODO_UPDATE: 'todayToDoUpdate',
  TODAY_TODO_DELETE: 'todayToDoDelete',
  GOAL: 'goal',
  GOAL_UPDATE: 'goalUpdate',
  GOAL_COMPLETE: 'goalComplete',
  GOAL_DELETE: 'goalDelete',
  ROUTINE: 'routine',
  ROUTINE_UPDATE: 'routineUpdate',
};

const TODO_LIST_BY_TYPES = [
  {
    key: TODO_TYPE.TODAY_TODO,
    title: '오늘 할 일',
  }, {
    key: TODO_TYPE.GOAL,
    title: '목표',
  }, {
    key: TODO_TYPE.ROUTINE,
    title: '루틴',
  }
];

const GOAL_MENU_LIST_ITEMS = [
  {
    key: TODO_TYPE.GOAL_UPDATE,
    title: '목표 수정',
  }, {
    key: TODO_TYPE.GOAL_COMPLETE,
    title: '목표 완료',
  }, {
    key: TODO_TYPE.GOAL_DELETE,
    title: '목표 삭제',
  }
];

const TODAY_TODO_MENU__LIST_ITEMS = [
  {
    key: TODO_TYPE.TODAY_TODO_UPDATE,
    title: '할 일 수정',
  }, {
    key: TODO_TYPE.TODAY_TODO_DELETE,
    title: '할 일 삭제',
  }
]

const DAY_OF_WEEK = [
  {
    key:'sunday',
    title: '일',
  }, {
    key: 'monday',
    title: '월',
  }, {
    key: 'tuesday',
    title: '화',
  }, {
    key: 'wednesday',
    title: '수',
  }, {
    key: 'thursday',
    title: '목',
  }, {
    key: 'friday',
    title: '금',
  }, {
    key:'saturday',
    title: '토',
  }
];

export {
  TODO_TYPE,
  TODO_LIST_BY_TYPES,
  DAY_OF_WEEK,
  GOAL_MENU_LIST_ITEMS,
  TODAY_TODO_MENU__LIST_ITEMS,
};
