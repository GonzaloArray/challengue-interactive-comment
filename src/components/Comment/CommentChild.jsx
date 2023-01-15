import { useState } from 'react';
import './Comment.css'

export const CommentChild = ({ name, id, array, setArray, setReply }) => {

    const [changeComment, setChangeComment] = useState(name + ' ');

    const handleChange = (e) => {
        setChangeComment(e.target.value);
    }

    const findCommentParent = (id, comments) => {
        for (let i = 0; i < comments?.length; i++) {
            if (comments[i]?.id === id) {
                return comments[i];
            }
            if (comments[i]?.replies) {
                const foundComment = findCommentParent(id, comments[i]?.replies);
                if (foundComment) {
                    return foundComment;
                }
            }
        }
        return null;
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
        <section className='fcc-contenedor fcc-flex'>
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
        </section>
    )
}
