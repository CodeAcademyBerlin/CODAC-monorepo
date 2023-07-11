import { useAuth } from "#/contexts/authContext";

import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useSocket } from "#/contexts/socketContext";
import { Enum_Componentleadlifecycle_State } from "codac-graphql-types";

const GetAllChats = gql`
  query getAllChats {
    chatrooms {
      data {
        id
        attributes {
          name
          createdAt
          users_permissions_users {
            data {
              id
              attributes {
                username
                avatar {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                role {
                  data {
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

type Props = {};

const KangaroosChat = (props: Props) => {
  const { data, error, loading } = useQuery(GetAllChats);
  const { user } = useAuth();
  console.log("user :>> ", user);

  // do I need this connected state???
  const [connected, setConnected] = useState(false);

  const { socket } = useSocket();
  useEffect(() => {
    if (socket) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [socket]);

  console.log("socket :>> ", socket);
  console.log("user :>> ", user);
  console.log("data from chris query :>> ", data);

  return (
    <>
      <h1>Your Chatrooms</h1>
      <div className="chatroom-access-link-container">
        {data &&
          data?.chatrooms?.data.map((chat: any) => {
            return (
              <div key={chat.id}>
                {/* se puede con el nombre?? sería mejor... */}
                <Link className="chatroom-access-link" href={`main-chat/${chat.id}`}>
                  <>
                    <svg
                      className="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 640 512"
                    >
                      <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z" />
                    </svg>
                    <span>{chat.attributes.name}</span>
                  </>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default KangaroosChat;
