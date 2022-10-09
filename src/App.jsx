import CommentSection from "./components/CommentSection";
import React, { useState } from "react";
import { CommentsProvider } from "./CommentsContext";
import { CurrentUserProvider } from "./CurrentUserContext";
import { ScoresProvider } from "./ScoresContext";

function App() {
  return (
    <CommentsProvider>
      <CurrentUserProvider>
        <ScoresProvider>
          <div className="container mx-auto flex justify-center max-w-[1440px] bg-verylightgrey">
            <CommentSection />
          </div>
        </ScoresProvider>
      </CurrentUserProvider>
    </CommentsProvider>
  );
}
export default App;
