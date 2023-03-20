import { createClient, LiveList, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey:
    "pk_dev_PtrABg2QEleD_tDZgGAGFXQR22oVq5HNnrYimQRojigKsm9USlNuhETjOfYpuGZp",
});

type Presence = {
  cursor: { x: number; y: number } | null;
};

type Storage = {
    student: LiveObject<{ firstName: string; lastName: string, subjects: string }>;
  };

export const { RoomProvider, useOthers, useUpdateMyPresence, useStorage, useMutation, useUndo, useRedo } =
  createRoomContext<Presence, Storage>(client);

  