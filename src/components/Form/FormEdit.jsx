import React, { useState } from 'react'


export const FormEdit = ({ comment, replies, setEdit, array, setArray, id }) => {

    const [editComment, setEditComment] = useState(comment);

    const editCommentRecursive = (id, newComment, comments) => {
        return comments.map(comment => {
            if (comment.id === id) {
                return {
                    ...comment,
                    comment: newComment
                }
            } else if (comment.replies) {
                return {
                    ...comment,
                    replies: editCommentRecursive(id, newComment, comment.replies)
                }
            } else {
                return comment;
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedComments = editCommentRecursive(id, editComment, array);
        
        setArray(updatedComments);
        setEdit(false);
    }

    const handleChange = (e) => {
        setEditComment(e.target.value);
    }

    return (
        <form className="fcc-form" onSubmit={handleSubmit}>
            <textarea
                className="fcc-textarea"
                name="text" id="comment"
                placeholder='Add comment'
                value={editComment}
                onChange={handleChange}
            >

            </textarea>
            <input className='fcc-submit' type="submit" value={'UPDATE'} />
        </form>
    )
}
