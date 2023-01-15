import { useState } from 'react';
import { AddCommentParent } from '../Comment/AddCommentParent';
import { Comment } from '../Comment/Comment'
import './InteractiveComment.css'

export const InteractiveComments = () => {
    
    const [array, setArray] = useState([
        {
            name: 'GonzaloArray',
            img: 'https://unavatar.io/GonzaloArray',
            date: '1 month ago',
            comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, beatae impedit distinctio in at voluptate fugiat odit itaque facilis molestias facere.',
            id: '123123fasdfeq123123qdfdsf',
            replies: []
        },
        {
            name: 'Ozuna',
            img: 'https://unavatar.io/fernandoherrera',
            date: '2 weeks ago',
            comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, beatae impedit distinctio in at voluptate fugiat odit itaque facilis molestias facere.',
            id: '123123fasdfeq123123qd13adsfasdf2312',
            replies: []
        },
    ]);

    return (
        <section className='ic-flex-general'>

            {
                array.map(comment => (
                    <Comment 
                        key={comment.id} 
                        date={comment.date}
                        name={comment.name} 
                        img={comment.img} 
                        comment={comment.comment} 
                        replies={comment.replies}
                        id={comment.id}
                        array={array}
                        setArray={setArray}
                    />
                ))
            }

            <AddCommentParent name={'@GonzaloArray '} array={array} setArray={setArray}/>
        </section>
    )
}
