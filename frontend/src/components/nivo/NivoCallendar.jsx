import { ResponsiveCalendar } from "@nivo/calendar";
import { format } from "date-fns";

const NivoCalendar = ({ data }) => {
  const customTooltip = ({ day, data }) => {
    return (
      <div
        style={{
          background: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <strong>Date:</strong> {format(new Date(day), "dd-MM-yyyy")}
        <br />
        <strong>Booking:</strong> {data.booking}
        <br />
        <strong>Occupancy:</strong> % {data.value}
        <br />
        <strong>Money:</strong> {data.money}
      </div>
    );
  };

  return (
    <ResponsiveCalendar
      data={data}
      from="2023-01-01"
      to="2023-12-31"
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
      tooltip={customTooltip}
    />
  );
};

export default NivoCalendar;
