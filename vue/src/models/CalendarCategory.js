import Model from "./Model";

const key = "uniq";
const { DEFAULT_EXPIRATION_MILLIS } = Model;
export default class CalendarCategory extends Model {
  resource() {
    return "categories";
  }

  async fetch(ctx, force) {
    if (force) ctx.$ls.remove(key);
    const resource = ctx.$ls.get(key) || await this.get();
    ctx.$ls.set(key, resource, DEFAULT_EXPIRATION_MILLIS);
    return resource;
  }
}
