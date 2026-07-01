import { pick, finalizeChoices } from "@/lib/utils";

function formatTime(hour, minute) {
  const suffix = hour >= 12 ? "pm" : "am";
  const displayHour = ((hour - 1) % 12) + 1;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export default function classTime() {
  const names = [
    "Danielle",
    "Marcus",
    "Sophia",
    "Noah",
    "Emily",
    "Aiden",
    "Grace",
    "Liam",
  ];

  const periods = [
    "first-period",
    "second-period",
    "third-period",
    "fourth-period",
    "science",
    "history",
    "math",
    "English",
  ];

  const person = pick(names);
  const period = pick(periods);

  // Duration between 35 and 95 minutes
  const duration = pick([35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]);

  // Start sometime during the school day
  const startHour = pick([8, 9, 10, 11, 12, 13, 14]);
  const startMinute = pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);

  const startTotal = startHour * 60 + startMinute;
  const endTotal = startTotal + duration;

  const endHour = Math.floor(endTotal / 60);
  const endMinute = endTotal % 60;

  const correct =
    duration >= 60
      ? `${Math.floor(duration / 60)} hour${Math.floor(duration / 60) > 1 ? "s" : ""}, ${duration % 60} minute${duration % 60 === 1 ? "" : "s"}`
      : `${duration} minutes`;

  const wrong = [];

  // Common mistake: subtract only the minutes
  const minuteDifference = Math.abs(endMinute - startMinute);
  wrong.push(
    minuteDifference === 1
      ? "1 minute"
      : `${minuteDifference} minutes`
  );

  // Common mistake: add an hour when unnecessary
  const plusTen = duration + 10;
  wrong.push(
    plusTen >= 60
      ? `${Math.floor(plusTen / 60)} hour${Math.floor(plusTen / 60) > 1 ? "s" : ""}, ${plusTen % 60} minute${plusTen % 60 === 1 ? "" : "s"}`
      : `${plusTen} minutes`
  );

  // Common mistake: subtract 10 minutes
  const minusTen = Math.max(5, duration - 10);
  wrong.push(
    minusTen >= 60
      ? `${Math.floor(minusTen / 60)} hour${Math.floor(minusTen / 60) > 1 ? "s" : ""}, ${minusTen % 60} minute${minusTen % 60 === 1 ? "" : "s"}`
      : `${minusTen} minutes`
  );

  return {
    prompt: `${person}'s ${period} class began at ${formatTime(
      startHour,
      startMinute
    )} and ended at ${formatTime(
      endHour,
      endMinute
    )}. How long was the class?`,
    choices: finalizeChoices(correct, wrong),
  };
}