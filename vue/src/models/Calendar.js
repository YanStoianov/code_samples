import Model              from "./Model";
import CalendarCategory   from "./CalendarCategory";
import CalendarColor      from "./CalendarColor";
import CalendarCountry    from "./CalendarCountry";
import CalendarEvent      from "./CalendarEvent";
import CalendarEventQuery from "./CalendarEventQuery";
import CalendarEventType  from "./CalendarEventType";
import CalendarHoliday    from "./CalendarHoliday";
import CalendarIcon       from "./CalendarIcon";
import CalendarMetadata   from "./CalendarMetadata";
import CalendarYear       from "./CalendarYear";

export default class Calendar extends Model {
  resource() {
    return "calendars";
  }

  calendarEvents() {
    return this.hasMany(CalendarEvent);
  }

  queryEvents() {
    return new CalendarEventQuery().for(this);
  }

  icons() {
    return this.hasMany(CalendarIcon);
  }

  colors() {
    return this.hasMany(CalendarColor);
  }

  statistics() {
    return this.statistics;
  }

  monthCounts() {
    return this.monthCounts;
  }

  year() {
    return this.year;
  }

  years() {
    return this.hasMany(CalendarYear);
  }

  categories() {
    return this.hasMany(CalendarCategory);
  }

  eventTypes() {
    return this.hasMany(CalendarEventType);
  }

  countries() {
    return this.hasMany(CalendarCountry);
  }

  holidays() {
    return this.hasMany(CalendarHoliday);
  }

  metadata() {
    return this.hasMany(CalendarMetadata);
  }
}
