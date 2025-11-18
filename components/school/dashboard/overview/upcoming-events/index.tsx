import EmptyIcon from "@/components/svgs/school/empty-table.svg";
import Link from "next/link";

type UpcomingEventsProps = {};

export const UpcomingEvents = ({}: UpcomingEventsProps) => {
  return (
    <div className="bg-white p-5 border border-grey-400 rounded-xl space-y-5 h-full">
      <div className="space-y-6 h-full">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Upcoming Events</h2>
          <Link href="/school">
            <p className="underline text-primary-300 font-medium hidden">
              View all
            </p>
          </Link>
        </div>
        <div className="h-full flex flex-col justify-center">
          <div className="w-fit mx-auto">
            <EmptyIcon className="w-full h-28" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="font-semibold text-lg sm:text-xl">
              Nothing here yet!
            </h2>
            <p className="w-full whitespace-normal break-words text-base font-medium text-grey-11">
              At this moment, we have no upcoming events to display. Everything
              is up to date!
            </p>
          </div>
        </div>
        {/* {upcomingEvents.length ? (
          upcomingEvents
            .slice(0, 5)
            .map((i) => <EventInfoItem event={i} key={i.title} />)
        ) : (
          <div>
            <p className="text-sm text-center text-grey-500">
              There are no upcoming events
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};
