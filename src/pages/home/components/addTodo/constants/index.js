const TODO_TYPE = {
  TODAY_TODO: 'todayToDo',
  GOAL: 'goal',
  ROUTINE: 'routine',
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
};
