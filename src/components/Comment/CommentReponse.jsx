import React, { useState } from 'react'
import { ButtonFollow } from '../Button/ButtonFollow'
import { CommentChild } from './CommentChild'

import svgImg from '../../assets/images/icon-reply.svg'
import deleteIcon from '../../assets/images/icon-delete.svg';
import editIcon from '../../assets/images/icon-edit.svg';
import responseIcon from '../../assets/images/icon-response.svg';

import './Comment.css'
import { FormEdit } from '../Form/FormEdit';
import { AnimatePresence, motion } from 'framer-motion';

export const CommentReponse = ({ name, date, img, comment, id, array, setArray, replies }) => {

    const [follow, setFollow] = useState(0);
    const [reply, setReply] = useState(false);
    const [showComment, setShowComment] = useState(true);
    const [edit, setEdit] = useState(false);

    const handleReply = () => {
        setReply(!reply);
    }
    const handleShowComment = () => {
        setShowComment(!showComment);
    }


    const handleDelete = () => {
        const filterArray = array.map(comment => {
            return {
                ...comment,
                replies: comment.replies.filter(reply => reply?.id !== id)
            }
        })

        setArray(filterArray)

    }

    const handleEdit = () => {
        setEdit(!edit);
    }

    return (
        <>
            <div className='cr-flex cr-contenedor-response'>
                <div className='cr-line'></div>
                <AnimatePresence >
                    <motion.article
                        className='ic-bg ic-flex ic-config-child-flex ic-closed'
                        initial={{
                            opacity: 0,
                            y: '-100%'
                        }}
                        transition={{delay: .1, type: 'spring', stiffness: 100}}
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
                            <p className='ics-state'>{follow}</p>
                            <ButtonFollow follow={follow} setFollow={setFollow}>
                                -
                            </ButtonFollow>
                        </aside>
                        <div className='ic-width'>
                            <header className="ic-header">
                                <div className='ic-flex'>
                                    <img className='ic-logo-img' src={img} alt="Icono" />
                                    <h2 className='ic-title'>{name}</h2>
                                    {
                                        name == '@GonzaloArray' &&
                                        (<p className='ic-you'>You</p>)
                                    }
                                    <p className='ic-descrip'>{date}</p>
                                </div>
                                {
                                    name == '@GonzaloArray' ?
                                        (
                                            <div className='ic-you-flex'>
                                                <button type='button' onClick={handleDelete} className='ic-you-flex ic-you-font ic-you-delete'>
                                                    <img src={deleteIcon} alt="Imagen Reply" />
                                                    <p>Delete</p>
                                                </button>
                                                <button type='button' onClick={handleEdit} className='ic-you-flex ic-you-font ic-you-edit'>
                                                    <img src={editIcon} alt="Imagen Reply" />
                                                    <p>Edit</p>
                                                </button>
                                            </div>
                                        )
                                        :
                                        (
                                            <button type='button' className='ic-button' onClick={handleReply}>
                                                <img src={svgImg} alt="Imagen Reply" />
                                                <p>Reply</p>
                                            </button>
                                        )
                                }
                            </header>
                            <main className='icm-main icm-top-2'>
                                {
                                    edit ?
                                        (
                                            <FormEdit setEdit={setEdit} array={array} setArray={setArray} comment={comment} replies={replies} id={id} />
                                        )
                                        :
                                        (
                                            <p className='icm-title'><span style={{ color: 'blue', cursor: 'pointer' }}>{comment?.split(' ')[0].includes('@') && comment?.split(' ')[0]}</span> {comment?.split(' ').slice(1).join(' ')}</p>
                                        )
                                }

                            </main>
                        </div>
                        <button className='icm-button icm-flex' onClick={handleShowComment}>
                            <motion.img 
                                src={responseIcon} 
                                className='icm-icon-img'
                                initial={{ rotate: 180}}
                                alt="Response Icon" 
                            />
                            <p>Show comment {replies?.length}</p>
                        </button>
                    </motion.article>
                </AnimatePresence>
            </div>
            {
                showComment &&
                (replies.map(reply => (
                    <div className='cr-edit'>
                        <CommentReponse key={reply?.id} date={reply?.date} name={reply?.name} img={reply?.img} comment={reply.comment} replies={reply?.replies} id={reply?.id} array={array} setArray={setArray} />
                    </div>
                )))
            }
            {
                reply &&
                (
                    <div className='cr-flex cr-mt-1'>
                        <div className='cr-line'></div>

                        <div className='cr-contenedor-response ic-flex ic-config-child-flex'>
                            <CommentChild name={'@' + name} id={id} array={array} setArray={setArray} setReply={setReply} />
                        </div>
                    </div>
                )
            }

        </>
    )
}
