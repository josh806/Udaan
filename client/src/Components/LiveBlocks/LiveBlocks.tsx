import React, {useState, FC} from "react";
import {
    RoomProvider,
    useOthers,
    useUpdateMyPresence,
    useStorage,
    useMutation,
    useUndo,
    useRedo,
  } from "./liveblocks.config";
  import { LiveObject } from "@liveblocks/client";


  function Others() {
    const others = useOthers();
    const updateMyPresence = useUpdateMyPresence();
    const student = useStorage((root) => root.student)
    console.log(student?.firstName)
    const undo = useUndo()
    const redo = useRedo()
    const [text, setText] = useState("");
  
    const updateName = useMutation(({ storage }, nameType, newName) => {
      const mutableStudent = storage.get("student");
      mutableStudent.set(nameType, newName);
    }, []);
  
    return (
      <>
        <div
          onPointerMove={(e) =>
            updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
          }
          onPointerLeave={() => updateMyPresence({ cursor: null })}
          style={{ width: "100vw", height: "100vh" }}
        >
          {others.map(({ connectionId, presence }) =>
            presence.cursor ? (
              <Cursor
                key={connectionId}
                x={presence.cursor.x}
                y={presence.cursor.y}
              />
            ) : null
          )}
        </div>
        <input value={student?.firstName}
         onChange={(e) => updateName("firstName", e.target.value)} 
        />
        <input value={student?.lastName} 
        onChange={(e) => updateName("lastName", e.target.value)}
        />
        <button onClick={() => undo()}>Undo</button>
        <button onClick={() => redo()}>Redo</button>
        <div>
          <p>There is {others.length} other users with you in the room</p>
        </div>
      </>
    );
  }
  
  
  // This is the cursor component
  function Cursor( {x , y} ) {
    return (
      <img
        style={{
          position: "absolute",
          transform: `translate(${x}px, ${y}px)`,
        }}
        src="https://liveblocks.io/images/cursor.svg"
      />
    );
  }

  const LiveBlocks: FC = () => {

    return (
        <RoomProvider id="my-room-id" initialPresence={{ cursor: null }} initialStorage={{student: new LiveObject({firstName: 'Joshua', lastName: 'McCarthy', subjects: 'Graphic Design'})}}>
        <Others />
      </RoomProvider>
    )
    }


export default LiveBlocks
