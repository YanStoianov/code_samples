const whereDealId = dealId => _.whereEq({ dealId });

const getters = {
  summaryByDealId          : state => dealId => {
    const summary = state.summaries.find(whereDealId(dealId));
    return summary;
  },
  summaryLoadByDealId      : state => dealId => {
    const summary = state.summaryLoads.find(whereDealId(dealId));
    return _.prop("summaryPromise", summary);
  },
  isLoadingSummaryByDealId : state => dealId => _.any(_.where({ dealId }), state.summaryLoads),
  isHasSummaryByDealId     : state => dealId => state.summaries.some(whereDealId(dealId)),
  isMissSummaryByDealId    : state => dealId => state.summaries.every(_.complement(whereDealId(dealId))),
};

export default getters;
