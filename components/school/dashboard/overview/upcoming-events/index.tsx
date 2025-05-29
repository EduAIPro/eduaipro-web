import Link from "next/link";
import upcomingEvents from "../../../data/upcoming-events.json";
import { EventInfoItem } from "./event-info";

type UpcomingEventsProps = {};

export const UpcomingEvents = ({}: UpcomingEventsProps) => {
  return (
    <div className="bg-white p-5 border border-grey-400 rounded-xl space-y-5 h-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Upcoming Events</h2>
          <Link href="/school">
            <p className="underline text-primary-300 font-medium">View all</p>
          </Link>
        </div>
        {upcomingEvents.length ? (
          upcomingEvents.map((i) => <EventInfoItem event={i} key={i.title} />)
        ) : (
          <div>
            <p className="text-sm text-center text-grey-500">
              There are no upcoming events
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
