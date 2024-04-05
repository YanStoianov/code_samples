const isNotEqRatioByDealId = _.curry((dealId, summary) => summary.dealId !== dealId);
const isMissByDealId = (dealId, collection) => collection.every(isNotEqRatioByDealId(dealId));

const mutations = {
  setClosingRate     : (state, { dealId = "", summary }) => {
    if (isMissByDealId(dealId, state.summaries)) {
      state.summaries = [{ dealId, ...summary }, ...state.summaries];
    } else {
      const isNotEqRatioByThisDealId = isNotEqRatioByDealId(dealId);
      state.summaries = state.summaries.map((summary) => isNotEqRatioByThisDealId(summary) ? summary : { ...summary, dealId });
    }
  },
  loadSummary   : (state, { dealId, summaryPromise }) => {
    if (isMissByDealId(dealId, state.summaryLoads)) {
      state.summaryLoads.push({ dealId, summaryPromise });
    }
  },

  loadedSummary : (state, dealId) => state.summaryLoads = _.rejectWhere({ dealId }, state.summaryLoads),
};

export default mutations;
