import React, { UseMemo } from "react";

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = (props) => {
    const peer = UseMemo(
        () =>
        new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ],
                },
            ],
        }),
        []
    );

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer; 
    };


    return (
        <PeerContext.Provider value={{ peer}}>
            {props.children}
        </PeerContext.Provider>
    )
}