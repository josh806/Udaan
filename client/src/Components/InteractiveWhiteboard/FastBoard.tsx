import React, { useEffect, useRef } from "react";
import { createFastboard, mount } from "@netless/fastboard";
import './FastBoard.css'

function Fastboard() {
  const appRef = useRef(null);

  useEffect(() => {
    let app;
    async function mountFastboard(div) {
      app = await createFastboard({
        sdkConfig: {
          appIdentifier: "F32XkMcZEe2safl2pxmVng/oPm-ru64AhNC1g",
          region: "us-sv",
        },
        joinRoom: {
          uid: "124",
          uuid: "93680990ca6511ed85245975e226531a",
          roomToken:
            "NETLESSROOM_YWs9Y2d4Y1NTVG1rN25neGpkSSZleHBpcmVBdD0xNjc5NjgwOTE0MDM4Jm5vbmNlPTE2Nzk2NzczMTQwMzgwMCZyb2xlPTAmc2lnPWY3YWJjNjcyYzExOGFkYmRiMzM2NDk4ZDVjOTQxZDMyMTI0N2YwNDgyMDhjMTQ5MTVlNjg5MTE1NjhhN2ZhYzgmdXVpZD05MzY4MDk5MGNhNjUxMWVkODUyNDU5NzVlMjI2NTMxYQ",
        },
        managerConfig: {
          cursor: true,
        },
      });
      window.app = app;
      return mount(app, div);
    }

    if (appRef.current) {
      mountFastboard(appRef.current);
    }

    return () => {
      if (app) {
        app.destroy();
      }
    };
  }, []);

  return <div ref={appRef} id="app"  />;
}

export default Fastboard;

