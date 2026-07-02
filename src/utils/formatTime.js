export const formatTime = (time) => {
   if (!time) return "-";

  return new Date(time).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};