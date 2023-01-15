import { useState } from 'react';
import { ButtonFollow } from '../Button/ButtonFollow'
import { CommentChild } from './CommentChild';
import { CommentReponse } from './CommentReponse';

import './Comment.css'

import svgImg from '../../assets/images/icon-reply.svg';
import responseIcon from '../../assets/images/icon-response.svg';

import { motion } from 'framer-motion';

// Motion
const variants = {
    open: { rotate: 0 },
    closed: { rotate: 180 }
}

export const Comment = ({ name, date, img, comment, id, array, setArray, replies }) => {

    const [follow, setFollow] = useState(0);
    const [showComment, setShowComment] = useState(true);
    const [reply, setReply] = useState(false);

    const handleReply = () => {
        setReply(!reply);
    }
    const handleShowComment = () => {
        setShowComment(!showComment);
    }

    return (
        <section className='ic-all-flex'>
            <motion.article
                className='ic-contenedor ic-flex ic-closed'
                initial={{
                    opacity: 0,
                    y: '-100%'
                }}
                transition={{ delay: .1, type: 'spring', stiffness: 100 }}
                animate={{
                    opacity: [0, .5, 1],
                    y: 0
                }}
                exit={{ opacity: 0, transition: 1 }}
            >
                <aside className='ics-flex ics-aside'>
                    <ButtonFollow follow={follow} setFollow={setFollow}>
                        +
                    </ButtonFollow>
                    <motion.p
                        className='ics-state'

                    >
                        {follow}
                    </motion.p>
                    <ButtonFollow follow={follow} setFollow={setFollow}>
                        -
                    </ButtonFollow>
                </aside>
                <div className='ic-width'>
                    <header className="ic-header">
                        <div className='ic-flex ic-mb-2'>
                            <img className='ic-logo-img' src={img} alt="Icono" />
                            <h2 className='ic-title'>{name}</h2>
                            <p className='ic-descrip'>{date}</p>
                        </div>
                        <button type='button' className='ic-button' onClick={handleReply}>
                            <img src={svgImg} alt="Imagen Reply" />
                            <p>Reply</p>
                        </button>
                    </header>
                    <main className='icm-main'>
                        <p className='icm-title'>{comment}</p>
                    </main>
                </div>
                <button
                    type='button'
                    className='icm-button icm-flex'
                    onClick={handleShowComment}
                >
                    <motion.img
                        src={responseIcon}
                        className='icm-icon-img'
                        variants={variants}
                        initial={{ rotate: 180 }}
                        animate={showComment ? "open" : "closed"}
                        alt="Arrow comment"
                    />
                    {
                        showComment &&
                        (<p>Show comment {replies.length}</p>)
                    }
                </button>
            </motion.article>
            {
                reply &&
                (<CommentChild name={'@' + name} id={id} array={array} setArray={setArray} setReply={setReply} />)
            }
            {showComment &&
                (replies.map(reply => (
                    <CommentReponse key={reply?.id} date={reply?.date} name={reply?.name} img={reply?.img} comment={reply?.comment} replies={reply?.replies} id={reply?.id} array={array} setArray={setArray} />
                )))
            }




        </section>
    )
}
