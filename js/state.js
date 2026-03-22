/* ════════════════════════════════════════════
   state.js — 애플리케이션 상태
════════════════════════════════════════════ */
const AppState = {
  round: 0,
  abSubset: [],
  choices: {},
  memoryText: '',
  selectedEmotions: [],
  selectedNegatives: [],
  companion: '',
  accOrder: [],
  selectedAccChips: [],
  currentProfile: null,
  // calendar
  calYear: null, calMonth: null, calSelected: null,
  selectedCity: '',

  reset() {
    this.round=0; this.abSubset=[]; this.choices={};
    this.memoryText=''; this.selectedEmotions=[];
    this.selectedNegatives=[]; this.companion='';
    this.accOrder=[]; this.selectedAccChips=[];
    this.currentProfile=null;
    this.calSelected=null; this.selectedCity='';
    this.cityData = null;
  },

  resetFromNeg() {
    this.selectedNegatives=[]; this.accOrder=[]; this.selectedAccChips=[];
  }
};
