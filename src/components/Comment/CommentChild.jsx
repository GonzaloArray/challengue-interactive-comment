import { motion } from 'framer-motion';
import { useState } from 'react';
import './Comment.css'

export const CommentChild = ({ name, id, array, setArray, setReply }) => {

    const [changeComment, setChangeComment] = useState(name + ' ');

    const handleChange = (e) => {
        setChangeComment(e.target.value);
    }

    const findCommentParent = (id, comments) => {
        return comments.find(comment => comment.id === id || (comment.replies && findCommentParent(id, comment.replies)));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const parentComment = findCommentParent(id, array);

        parentComment.replies = [...parentComment?.replies, {
            name: '@GonzaloArray',
            img: 'https://unavatar.io/GonzaloArray',
            date: 'comment', replies: [],
            comment: changeComment,
            id: Math.random().toString()
        }];

        setArray([...array]);
        setChangeComment('');
        setReply(false);

    };

    return (
        <motion.section
            className='fcc-contenedor fcc-flex'
            initial={{ x: "100%" }}
            animate={{
                x: 0,
                backgroundColor: "#fff",
                transition: '1s',
                transitionEnd: {
                    transition: '1s',
                },
            }}
        >
            <img className='ic-logo-img' src="https://unavatar.io/GonzaloArray" alt="Icono" />
            <form className="fcc-form" onSubmit={handleSubmit}>
                <textarea
                    className="fcc-textarea"
                    name="text" id="comment"
                    placeholder='Add comment'
                    value={changeComment}
                    onChange={handleChange}
                >

                </textarea>
                <input className='fcc-submit' type="submit" value={'SEND'} />
            </form>
        </motion.section>
    )
}
