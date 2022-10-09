import React, { useState, useContext, useEffect } from "react";
import CommentScore from "./CommentScore";
import BigButton from "../utility/BigButton";
import { CommentsContext } from "../CommentsContext";
import { CurrentUserContext } from "../CurrentUserContext";
import { ScoresContext } from "../ScoresContext";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);

const Comment = ({ comment, level = 1 }) => {
  const [replyMode, setReplyMode] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [savedReply, setSavedReply] = useState("");
  const isEditTextareaDisabled = replyText.length === 0;
  const [editMode, setEditMode] = useState(false);
  const [comments, setComments] = useContext(CommentsContext);
  const [scores, setScores] = useContext(ScoresContext);
  const [editText, setEditText] = useState(comment.content);

  const currentUserContext = useContext(CurrentUserContext);
  const currentUser = currentUserContext[0];

  const [userIsCurrent, setUserIsCurrent] = useState(false);
  useEffect(() => {
    if (comment.user.username === currentUser.username) {
      setUserIsCurrent(true);
    }
  }, [comments]);

  const toggleReplyMode = () => {
    setReplyMode((replyMode) => !replyMode);
  };
  const toggleEditMode = () => {
    setEditMode((editMode) => !editMode);
    setEditText(comment.content);
  };

  const deleteComment = (id, parentId) => {
    console.log("delete!", id, comments);
    console.log();
    if (level === 1) {
      setComments((prev) => prev.filter((comments) => comments.id !== id));
    } else {
      let parent =
        comments[comments.findIndex((comment) => parentId === comment.id)];

      let modifiedReplies = parent.replies.filter(
        (comments) => comments.id !== id
      );

      parent = { ...parent, replies: modifiedReplies };

      setComments((prev) => [
        ...prev.filter((comment) => comment.id != parentId),
        parent,
      ]);
    }
  };

  const handleCommentReply = (e) => {
    e.preventDefault();

    let thisReply = {
      id: Math.floor(Math.random() * Date.now()),
      content: replyText,
      createdAt: Date.now(),
      score: 1,
      replyingTo: comment.user.username,
      user: {
        image: {
          png: currentUser.image.png,
        },
        username: currentUser.username,
      },
      replies: [],
      parentId: comment.id,
    };

    let newComments = [...comments];
    if (level !== 2) {
      let parentIndex = comments
        .map(function (x) {
          return x.id;
        })
        .indexOf(comment.id);
      newComments[parentIndex].replies = Array(
        ...newComments[parentIndex].replies,
        thisReply
      );
    } else {
      let parentIndex = comments
        .map(function (x) {
          return x.id;
        })
        .indexOf(comment.parentId);
      thisReply.parentId = comment.parentId;
      newComments[parentIndex].replies = Array(
        ...newComments[parentIndex].replies,
        thisReply
      );
    }
    setComments(newComments);
    setReplyText("");
    setReplyMode(false);
  };

  useEffect(() => {
    if (!scores[comment.id])
      setScores((prev) => {
        return { ...prev, [comment.id]: comment.score };
      });
  }, []);

  const handleCommentEdit = () => {
    let newComments = [...comments];
    console.log(newComments);
    if (level !== 2) {
      let commentIndex = comments
        .map(function (x) {
          return x.id;
        })
        .indexOf(comment.id);
      newComments[commentIndex].content = editText;
    } else {
      console.log(editText);
      let parentIndex = comments
        .map(function (x) {
          return x.id;
        })
        .indexOf(comment.parentId);
      let commentIndex = comments[parentIndex].replies
        .map(function (x) {
          return x.id;
        })
        .indexOf(comment.id);
      newComments[parentIndex].replies[commentIndex].content = editText;
      console.log(newComments[parentIndex]);
    }

    setComments(newComments);
    setEditText("");
    setEditMode(false);
  };

  return (
    <div>
      <div
        className={`mb-8 py-6 px-4 flex flex-row bg-white rounded-lg ${
          level === 2 ? "w-[600px] ml-auto" : null
        }`}
      >
        <CommentScore score={comment.score} id={comment.id} key={comment.id} />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between mb-4">
            <div className="flex flex-row items-center gap-4">
              <img src={comment.user.image.png} className="w-8" />
              <div className="font-medium flex flex-row items-center">
                {comment.user.username}
                {userIsCurrent ? (
                  <span className="mx-2 text-xs text-white bg-midblue py-1 px-2 rounded-sm">
                    YOU
                  </span>
                ) : null}
              </div>
              <div className="text-grayishblue">
                <ReactTimeAgo date={comment.createdAt} locale="en-US" />
              </div>
            </div>
            {userIsCurrent ? (
              <div className="flex flex-row items-center">
                <button
                  onClick={() => deleteComment(comment.id, comment.parentId)}
                  className="text-softred font-medium flex flex-row items-center gap-2 hover:opacity-50 mr-6  active:opacity-75"
                >
                  <svg
                    width="12"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                      fill="#ED6368"
                    />
                  </svg>
                  Delete
                </button>
                <button
                  onClick={toggleEditMode}
                  className="text-midblue font-medium flex flex-row items-center gap-2 hover:opacity-50 mr-2  active:opacity-75"
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                      fill="#5357B6"
                    />
                  </svg>
                  Edit
                </button>
              </div>
            ) : (
              <button
                onClick={toggleReplyMode}
                className="text-midblue font-medium flex flex-row items-center gap-2 hover:opacity-50 mr-2  active:opacity-75"
              >
                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                    fill="#5357B6"
                  />
                </svg>
                Reply
              </button>
            )}
          </div>
          <div className="text-grayishblue text-sm tracking-wide leading-5 mr-2">
            {editMode ? (
              <div className="flex flex-col items-end">
                <textarea
                  className="w-full flex-1 border-2 rounded-md px-4 py-2 mb-4 border-lightgray active:border-midblue text-grayishblue text-sm"
                  value={
                    editText
                    // &&
                    // `@${comment.replyingTo}${comment.content}``${comment.content}`
                  }
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="bg-midblue text-white rounded-md px-8 py-2 uppercase w-28 h-10 hover:opacity-50 active:opacity-75"
                  onClick={handleCommentEdit}
                >
                  save
                </button>
              </div>
            ) : (
              <>
                {comment.replyingTo && (
                  <span className="text-midblue font-bold mr-1 cursor-pointer hover:opacity-80">
                    @{comment.replyingTo}
                  </span>
                )}
                {comment.content}
              </>
            )}
          </div>
        </div>
      </div>
      {replyMode && (
        <div
          className={`-mt-6 mb-8 py-6 px-4 flex flex-row
           bg-white rounded-lg ${level === 2 ? "w-[600px] ml-auto" : null}`}
        >
          <img src={currentUser?.image?.png} className="w-10 h-10" />
          <form onSubmit={handleCommentReply} className="w-full flex">
            <textarea
              className="flex-1 border-2 rounded-md px-4 py-2 mx-4 border-lightgray active:border-midblue text-grayishblue text-sm"
              onChange={(e) => setReplyText(e.target.value)}
              value={replyText}
            />
            <button
              className="bg-midblue text-white rounded-md px-8 py-2 uppercase w-28 h-10 hover:opacity-50 active:opacity-75"
              disabled={isEditTextareaDisabled}
              type="submit"
            >
              reply
            </button>
          </form>
        </div>
      )}
      {comment.replies?.length > 0
        ? comment.replies.map((reply) => (
            <Comment
              comment={reply}
              level={2}
              key={reply.id}
              setComments={setComments}
            />
          ))
        : null}
    </div>
  );
};

export default Comment;
