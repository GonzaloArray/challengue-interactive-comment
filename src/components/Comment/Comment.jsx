import { useState } from 'react';
import { ButtonFollow } from '../Button/ButtonFollow'
import { CommentChild } from './CommentChild';
import { CommentReponse } from './CommentReponse';

import './Comment.css'

import svgImg from '../../assets/images/icon-reply.svg'


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
            <article className='ic-contenedor ic-flex ic-closed'>
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
                <button className='icm-button' onClick={handleShowComment}>
                    <p>Show comment {replies.length}</p>
                </button>
            </article>
            {
                reply &&
                (<CommentChild name={'@' + name} id={id} array={array} setArray={setArray} setReply={setReply} />)
            }
            {showComment &&
                (replies.map(reply => (
                    <CommentReponse key={reply.id} date={reply.date} name={reply.name} img={reply.img} comment={reply.comment} replies={reply.replies} id={reply.id} array={array} setArray={setArray} />
                )))
            }




        </section>
    )
}
