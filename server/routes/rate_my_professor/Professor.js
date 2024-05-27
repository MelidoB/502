class Professor {
    constructor(legacyId, firstName = '', lastName = '', numRatings = 0, overallRating = 0, department = '', wouldTakeAgain = 0, difficulty = 0, profileUrl = '') {
      this.legacyId = legacyId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.numRatings = numRatings;
      this.overallRating = overallRating;
      this.department = department;
      this.wouldTakeAgain = wouldTakeAgain;
      this.difficulty = difficulty;
      this.profileUrl = profileUrl;
    }
  }
  
  module.exports = Professor;
  