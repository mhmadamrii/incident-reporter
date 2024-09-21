export function NoIncidentReported() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-md border py-5">
      <h1 className="text-2xl font-bold text-red-500">
        No incident reported yet!
      </h1>
      <p className="text-lg text-gray-500">
        We haven't reported any incident yet. Start by reporting an incident
        today and make something useful for community.
      </p>
    </div>
  );
}
