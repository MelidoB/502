const URLSearchParams = require('url').URLSearchParams;

function createSearchPayload(subject) {
  return new URLSearchParams({
    selectedSubjectName: subject.text,
    subject_name: subject.value,
    selectedCCareerName: '',
    courseCareer: '',
    selectedCAttrName: '',
    courseAttr: '',
    selectedCAttrVName: '',
    courseAttValue: '',
    selectedReqDName: '',
    reqDesignation: '',
    open_class: 'O',
    selectedSessionName: '',
    class_session: '',
    selectedModeInsName: '',
    meetingStart: 'LT',
    selectedMeetingStartName: 'less than',
    meetingStartText: '',
    AndMeetingStartText: '',
    meetingEnd: 'LE',
    selectedMeetingEndName: 'less than or equal to',
    meetingEndText: '',
    AndMeetingEndText: '',
    daysOfWeek: 'I',
    selectedDaysOfWeekName: 'include only these days',
    instructor: 'B',
    selectedInstructorName: 'begins with',
    instructorName: '',
    search_btn_search: 'Search'
  });
}

module.exports = createSearchPayload;
