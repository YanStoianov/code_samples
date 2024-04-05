import { postReq } from "@/utils/token";

export default {
  methods: {
    async share(args) {
      let res;
      if (args.page === "event") {
        res = await postReq("/1/eventShare", {
          ...args
        });
      } else if (args.page === "deal") {
        let { dealId, emails, cb } = args;
        res = await postReq(`/1/deals/${dealId}/sendEmail`, {
          dealId : dealId,
          emails     : emails,
          type       : "share"
        });
        cb({ success: true });
      }
    }
  },
};
