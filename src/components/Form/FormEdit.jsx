import { motion } from 'framer-motion';
import React, { useState } from 'react'

const buttonVarian = {
    hidden: {
        x: '200%',
        opacity: 0,
    },
    visible: {
        x: '0',
        opacity: 1,
        type: 'spring'
    },
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.3,
            delay: .1,
        }
    }
}

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
            <motion.input
                className='fcc-submit'
                type="submit"
                value={'UPDATE'}
                variants={buttonVarian}
                initial='hidden'
                animate='visible'
                whileHover='hover'
            />
        </form>
    )
}
