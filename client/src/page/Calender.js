import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Providers } from "@microsoft/mgt-element";
// import { Agenda } from "@microsoft/mgt-react";

const event = {
  subject: "Let's go for lunch",
  body: {
    contentType: "HTML",
    content: "Does mid month work for you?",
  },
  start: {
    dateTime: "2021-06-05T18:00:00",
    timeZone: "India Standard Time",
  },
  end: {
    dateTime: "2021-06-05T23:00:00",
    timeZone: "India Standard Time",
  },
};

const createEvent = async function (graphClient) {
  return await graphClient.api("/me/calendar/events").post(event);
};

const Calender = () => {
  const [state, setState] = useState(false);
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (userData.isSignedIn) {
      let provider = Providers.globalProvider;
      let graphClient = provider.graph.client;
      if (state) {
        createEvent(graphClient).then((result) => console.log(result));
      }
      setState(false);
    }
  }, [state, setState, userData]);

  return (
    <div style={{ marginTop: "16px" }}>
      {/* <button onClick={() => setState(true)}>Add event</button> */}
      <mgt-agenda
        group-by-day
        preferred-timezone="India Standard Time"
      ></mgt-agenda>
    </div>
  );
};

export default Calender;
