import { getReq } from "@/utils/token/index.js";

const SUMMERY_RATIO_PATH = "/1/deals/";
const SUMMERY_RATIO_PATH_LEFT = "/engagement/summary";
const makeUrlSummary = dealId => SUMMERY_RATIO_PATH + dealId + SUMMERY_RATIO_PATH_LEFT;
const loadSummary = dealId => getReq(makeUrlSummary(dealId));
const getSummary = _.path(["data", "data"]);

const actions = {
  async getSummaryByDealId ({ commit, getters }, dealId = "") {
    const load = getters.summaryLoadByDealId(dealId);
    if (load) return getSummary(await load);
    try {
      commit("loadSummary", { dealId, summaryPromise });
      const summaryPromise = loadSummary(dealId);
      const summary = getSummary(await summaryPromise);
      commit("setClosingRate", { dealId, summary});
      return summary;
    } catch (error) {
      console.error({ error });
    } finally {
      commit("loadedSummary", dealId);
    }
  },
};

export default actions;
