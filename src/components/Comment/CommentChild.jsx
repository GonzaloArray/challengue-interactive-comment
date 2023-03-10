import { motion } from 'framer-motion';
import { useState } from 'react';
import './Comment.css'

export const CommentChild = ({ name, id, array, setArray, setReply }) => {

    const [changeComment, setChangeComment] = useState(name + ' ');

    const handleChange = (e) => {
        setChangeComment(e.target.value);
    }

    const findCommentParent = (id, comments) => {
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id === id) {
                return comments[i];
            }
            if (comments[i].replies) {
                const foundComment = findCommentParent(id, comments[i].replies);
                if (foundComment) {
                    return foundComment;
                }
            }
        }
        return null;
    }
    /* const findCommentParent = (id, comments) => {
        return comments.find(comment => comment.id === id || (comment.replies && findCommentParent(id, comment.replies)));
    } */

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
    return (
        <motion.section
            className='fcc-contenedor fcc-flex'
            initial={{ x: "100%" }}
            transition={{delay: .1, type: 'spring', stiffness: 100}}
            animate={{
                x: 0,
                backgroundColor: "#fff",
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
                <motion.input 
                    className='fcc-submit' 
                    type="submit" 
                    value={'SEND'} 
                    variants={buttonVarian}
                    initial='hidden'
                    animate='visible'
                    whileHover='hover'
                />
            </form>
        </motion.section>
    )
}
