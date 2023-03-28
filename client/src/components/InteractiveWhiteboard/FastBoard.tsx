import React, { useEffect, useRef } from 'react';
import { RootState } from '../../redux/store';
import { FastboardApp, createFastboard, createUI } from '@netless/fastboard';
import './FastBoard.css';
import { useSelector } from 'react-redux';

import { User, Lesson } from '../../types/types';

async function mountFastboard(
  div: Element | undefined,
  user: User,
  lesson: Lesson
) {
  const app = await createFastboard({
    sdkConfig: {
      appIdentifier: 'F32XkMcZEe2safl2pxmVng/oPm-ru64AhNC1g',
      region: 'us-sv',
    },
    joinRoom: {
      uid: user.id as string,
      uuid: lesson.whiteboardId as string,
      roomToken: lesson.whiteboardToken as string,
    },
    managerConfig: {
      cursor: true,
    },
  });
  window.app = app;
  createUI(app, div);
  return app;
}

function Fastboard() {
  const appRef = useRef(null);
  const user = useSelector((state: RootState) => state.users);
  const lesson = useSelector((state: RootState) => state.lesson);

  useEffect(() => {
    let app: FastboardApp | Promise<FastboardApp>;

    if (appRef.current) {
      app = mountFastboard(appRef.current, user, lesson);
    }

    return () => {
      if (app && app instanceof FastboardApp) {
        app.destroy();
      }
    };
  }, [lesson]);

  return (
    <div
      ref={appRef}
      className="whiteboard"
    />
  );
}

export default Fastboard;
