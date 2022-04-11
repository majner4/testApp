import React, { useCallback, useEffect, useState } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import { ISchedule, ICalendarInfo } from "tui-calendar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Typography } from "@material-ui/core";
import {
  getUserEvents,
  createUserEvent,
  updateUserEvent,
  deleteUserEvent,
} from "../../services/userEventsAPI";
import { useUserData } from "../../contexts/userContext";
import "tui-calendar/dist/tui-calendar.css";
// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import "./tui-calendar.css";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    viewCalendar: {
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "row",
      marginBottom: "0.5rem",
    },
  })
);

const calendars: ICalendarInfo[] = [
  {
    id: "1",
    name: "My Calendar",
    color: "#ffffff",
    bgColor: "#9e5fff",
    dragBgColor: "#9e5fff",
    borderColor: "#9e5fff",
  },
];

const templates = {};

const UserCalendar = () => {
  const classes = useStyles();
  const [view, setView] = useState<string>("week");
  const userEventsStore = useUserData().context.userEvents;
  const events = useUserData().context.userEvents.events;
  const token = Cookies.get("token");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setView((event.target as HTMLInputElement).value);
  };

  const getEvents = async () => {
    if (token) {
      const data = await getUserEvents.get(token);
      if (data) {
        userEventsStore.setEvents(data);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
  }, []);

  const onBeforeCreateSchedule = useCallback(async (scheduleData) => {
    const generateId = String(
      Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
    const schedule: ISchedule = {
      id: generateId,
      calendarId: scheduleData.calendarId,
      title: scheduleData.title,
      start: scheduleData.start._date.toISOString(),
      end: scheduleData.end._date.toISOString(),
      category: scheduleData.isAllDay ? "allday" : "time",
      location: scheduleData.location,
    };

    if (token && schedule) {
      const newUserEvent = await createUserEvent.create(schedule, token);
      if (createUserEvent) {
        userEventsStore.setEvents(newUserEvent);
        getEvents();
      }
    }
  }, []);

  const onBeforeDeleteSchedule = useCallback(async (res) => {
    console.log(res);
    const { id } = res.schedule;
    if (id) {
      const deleteddUserEvent = await deleteUserEvent.delete(id);
      if (deleteddUserEvent) {
        userEventsStore.setEvents(deleteddUserEvent);
        getEvents();
      }
    }
  }, []);

  const onBeforeUpdateSchedule = useCallback(async (e) => {
    // console.log(e);

    const { schedule, changes } = e;
    let start =
      changes && changes.start ? changes.start._date : schedule.start._date;
    let end = changes && changes.end ? changes.end._date : schedule.end._date;

    const updateEvent = {
      ...schedule,
      ...changes,
      start: start.toISOString(),
      end: end.toISOString(),
    };

    if (token && schedule) {
      const updatedUserEvent = await updateUserEvent.update(updateEvent, token);
      if (updateUserEvent) {
        userEventsStore.setEvents(updatedUserEvent);
        getEvents();
      }
    }
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" color="textPrimary">
        Kalendář
      </Typography>
      <RadioGroup
        className={classes.viewCalendar}
        aria-label="view"
        name="calendarView"
        value={view}
        onChange={handleChange}
      >
        <FormControlLabel
          value="day"
          control={<Radio color="default" />}
          label="Den"
        />
        <FormControlLabel
          value="week"
          control={<Radio color="default" />}
          label="Týden"
        />
        <FormControlLabel
          value="month"
          control={<Radio color="default" />}
          label="Měsíc"
        />
      </RadioGroup>
      <TUICalendar
        height="600px"
        view={view}
        useCreationPopup={true}
        useDetailPopup={true}
        taskView={[""]}
        scheduleView={["time"]}
        template={{
          timegridDisplayPrimayTime: function (time) {
            return time.hour + ":" + time.minutes.toString().padStart(2, "0");
          },
          timegridDisplayTime: function (time) {
            return time.hour + ":" + time.minutes.toString().padStart(2, "0");
          },
          titlePlaceholder: function () {
            return "Název události";
          },
          locationPlaceholder: function () {
            return "Místo události";
          },
          popupIsAllDay: function () {
            return "Celý den";
          },
          popupSave: function () {
            return "Vytvořit";
          },
          popupUpdate: function () {
            return "Uložit";
          },
          popupEdit: function () {
            return "Editovat";
          },
          popupDelete: function () {
            return "Smazat";
          },
        }}
        week={{
          daynames: [
            "Neděle",
            "Pondělí",
            "Úterý",
            "Středa",
            "Čtvrtek",
            "Pátek",
            "Sobota",
          ],
          startDayOfWeek: 1,
          narrowWeekend: false,
          workweek: false,
          showTimezoneCollapseButton: false,
          timezonesCollapsed: false,
          hourStart: 0,
          hourEnd: 24,
        }}
        month={{
          daynames: [
            "Neděle",
            "Pondělí",
            "Úterý",
            "Středa",
            "Čtvrtek",
            "Pátek",
            "Sobota",
          ],
          startDayOfWeek: 1,
          narrowWeekend: true,
          visibleWeeksCount: 6,
          isAlways6Week: true,
          workweek: false,
          visibleScheduleCount: 1,
          moreLayerSize: {},
          grid: {},
        }}
        calendars={calendars}
        schedules={events ?? []}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
    </div>
  );
};

export default UserCalendar;
