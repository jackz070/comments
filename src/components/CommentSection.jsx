import React, { useState, useContext, useEffect } from "react";
import { CommentsContext } from "../CommentsContext";
import { CurrentUserContext } from "../CurrentUserContext";
import Comment from "./Comment";
// import data from "../../data.json";

const CommentSection = () => {
  const [comments, setComments] = useContext(CommentsContext);

  const [newPostText, setNewPostText] = useState("");
  const currentUserContext = useContext(CurrentUserContext);
  const currentUser = currentUserContext[0];

  const createComment = (comment, parentId = null) => {
    let thisComment = {
      id: Math.floor(Math.random() * Date.now()),
      content: comment,
      createdAt: Date.now(),
      score: 1,
      user: {
        image: {
          png: currentUser.image.png,
        },
        username: currentUser.username,
      },
      replies: [],
    };
    if (!parentId) {
      let items = [thisComment, ...comments];
      setComments(items);
    } else {
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    createComment(newPostText);
    console.log(comments);
    setNewPostText("");
  };

  return (
    <div className="max-w-2xl py-20">
      {comments.map((comment) => (
        <Comment
          comment={comment}
          setComments={setComments}
          comments={comments}
          key={comment.id}
        />
      ))}
      <div
        className={`-mt-6 mb-8 py-6 px-4 flex flex-row
           bg-white rounded-lg`}
      >
        <img src={currentUser?.image?.png} className="w-10 h-10" />

        <form onSubmit={handleAddComment} className="w-full flex">
          <textarea
            className="flex-1 border-2 rounded-md px-4 py-2 mx-4 border-lightgray active:border-midblue text-grayishblue text-sm"
            onChange={(e) => setNewPostText(e.target.value)}
            value={newPostText}
          />
          <button className="bg-midblue text-white rounded-md px-8 py-2 uppercase w-28 h-10 hover:opacity-50 active:opacity-75">
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
