  import React, { useEffect, useCallback } from "react";
  import { useSocket } from "../providers/Socket";
  import { usePeer } from "../providers/Peer";


  const RoomPage = () => {
    const { socket } = useSocket();
    const { peer, createOffer, createAnswer } = usePeer();
     
    const handleNewUserJoined = useCallback(async (data) => {
        const { emailId } = data;
        console.log("New user joined room", emailId);
        const offer = await createOffer();
        socket.emit("call-user", {emailId, offer})
    },
     [createOffer, socket]
    );

    const handleIncommingCall = useCallback(async(data) => {
        const { from, offer } = data;
        console.log("Incomming Call from", from, offer);
        const ans = await createAnswer(offer);
        socket.emit("call-accepted", { emailId: from, ans });
    },
     [createAnswer, socket]
     );

     const handleCallAccepted = useCallback(() => {}, [])

    useEffect(() => {
        socket.on("user-joined", handleNewUserJoined);
        socket.on("incomming-call", handleIncommingCall);
        socket.on("call.accepted", handleCallAccepted);

        return () => {
            socket.off("user-joined", handleNewUserJoined);
            socket.off("incomming-call", handleIncommingCall);
            socket.off("call-accepted", handleCallAccepted); 
        }; 
    }, [handleNewUserJoined, handleIncommingCall, socket]);

    return (
        <div className="room-page-container">
            <h1>Room Page</h1>
        </div>
    )
  };
  export default RoomPage;
