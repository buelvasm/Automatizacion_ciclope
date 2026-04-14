export interface TimeSheetData {
  totalHours: string;
  taskType: string;
  observations: string;
  totalHoursDailys: string;
  taskTypeDailys: string;
  observationsDailys: string;
  totalHoursFriday: string;
  observationsFriday: string;
}

export const defaultTimeSheetData: TimeSheetData = {
  totalHours: "09:00:00",
  totalHoursDailys: "00:30:00",
  totalHoursFriday: "06:00:00",
  taskType: "Ejecución",
  taskTypeDailys: "Dailys",
  observations: process.env.TEST_OBSERVATIONS || "",
  observationsDailys: process.env.TEST_OBSERVATIONS_DAILYS || "",
  observationsFriday: process.env.TEST_OBSERVATIONS_FRIDAY || "",
};