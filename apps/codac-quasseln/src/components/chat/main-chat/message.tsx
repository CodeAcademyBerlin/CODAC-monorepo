import { FormEvent, useState } from "react";
import React from "react";
import { useAuth } from "#/contexts/authContext";
import { gql, useQuery, useMutation } from "@apollo/client";

import { formatDate } from "#/utils/api-helpers";

const upDateChatMessage = gql`
  mutation updateMessage($id: ID!, $body: String!) {
    updateMessage(id: $id, data: { body: $body }) {
      data {
        id
        attributes {
          body
        }
      }
    }
  }
`;

const getSingleMessage = gql`
  query GetMessageById($id: ID) {
    message(id: $id) {
      data {
        id
        attributes {
          body
          author {
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
              }
            }
          }
        }
      }
    }
  }
`;

const deleteChatMessage = gql`
  mutation deleteMessage($id: ID!) {
    deleteMessage(id: $id) {
      data {
        id
      }
    }
  }
`;

const Message = ({ message }: { message: any }) => {
  console.log("message.id: ", message.id);
  const [hiddenDiv, setHiddenDiv] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [newMsg, setNewMsg] = useState("");

  const { loading, error, data, refetch } = useQuery(getSingleMessage, {
    variables: { id: message.id },
  });

  // console.log("data: ", data);

  const { user } = useAuth();

  const userId = user?.id;

  const [updateMessageMutation] = useMutation(upDateChatMessage);

  const [deleteMessageMutation] = useMutation(deleteChatMessage);
  //  the mentor has permmision to delete as well... condicional... id not working and only deleting first message...
  const deleteMessage = async (messageId: any) => {
    console.log("object :>> ", message.attributes.author.data?.id);
    if (userId === message.attributes.author.data.id || user?.role?.name === "Mentor") {
      deleteMessageMutation({
        variables: {
          id: message.id,
        },
      });
      await refetch();
    }
  };
  const updateMessage = async (e: FormEvent<HTMLFormElement>, message: any) => {
    e.preventDefault();
    console.log("message.id :>> ", message.id);
    if (userId === message.attributes.author.data.id || user?.role?.name === "Mentor") {
      if (newMsg) {
        updateMessageMutation({
          variables: {
            id: message.id,
            body: newMsg, // we need to create a new form with this variable as msg body
          },
        });
      }
      setNewMsg("");
      // await refetch();
      refetch();
    }
  };

  return (
    <div className="message-container">
      {!editToggle && (
        <>
          <div className="option-A" style={{ border: "2px solid white", margin: "1rem" }}>
            <p>
              {message && message.attributes.author.data.attributes.username} -{" "}
              {message && message.attributes.createdAt}{" "}
              <button
                onClick={() => {
                  setEditToggle(!editToggle);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  // updateMessage();
                  setHiddenDiv(!hiddenDiv);
                }}
              >
                Delete
              </button>
            </p>
            <p>{message && message.attributes?.body}</p>
            {hiddenDiv && (
              <>
                <span>No</span>
                <span
                  onClick={() => {
                    deleteMessage(message.id);
                  }}
                >
                  Yes
                </span>
              </>
            )}
          </div>
        </>
      )}
      {editToggle && (
        <>
          <div className="option-B">
            <form action="submit">
              <label htmlFor="newText">{message && message.attributes?.body}</label>
              <textarea
                name="newText"
                value={newMsg}
                onChange={(e) => {
                  setNewMsg(e.target.value);
                  console.log("new message   :", newMsg);
                }}
              />
              <button
                type="submit"
                onClick={() => {
                  updateMessage;
                }}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditToggle(!editToggle);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Message;
