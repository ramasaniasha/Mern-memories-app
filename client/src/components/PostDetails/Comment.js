import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const Comments = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [isshow,setIsshow] = useState(false);
  const [showtext,setShowtext] = useState(true);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const finalComment = `${user?.result?.name}:${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    // window.location.reload();
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handlemore = () => {
    setIsshow(!isshow);
    setShowtext(!showtext)
   }


  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>

              {comments?.slice(0, 3).map((c, i) => (
                <Typography key={i} gutterBottom variant="subtitle1">
                    {c}
                </Typography>             
              ))}
              {isshow && 
                (comments?.slice(4, comments.length).map((c, i) => (
                  <Typography key={i} gutterBottom variant="subtitle1">
                      {c}
                  </Typography>             
                )))}         
              
            </div>
            {(showtext)?
              <Button onClick={handlemore} color="primary"
              variant="contained" disabled={comments.length<4}>show more</Button>
            :
            <Button onClick={handlemore} color="primary"
              variant="contained" disabled={comments.length<4}>show less</Button>
            }


          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
  );
};

export default Comments;
