import { motion } from 'framer-motion';
import React, { useState } from 'react'
import './Comment.css'


export const AddCommentParent = ({ name, array, setArray }) => {
    const [changeName, setChangeName] = useState('');

    const handleChange = (e) => {
        setChangeName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (changeName !== '' && changeName?.length > 12) {
            setArray([...array, {
                name,
                img: `https://unavatar.io/${name}`,
                date: 'moment',
                comment: changeName,
                replies: [],
                id: String.fromCharCode(Date.now()),
            }]);

            setChangeName('')
        }
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
        <section className='fcc-contenedor fcc-flex'>
            <img className='ic-logo-img' src="https://unavatar.io/GonzaloArray" alt="Icono" />
            <form className="fcc-form" onSubmit={handleSubmit}>
                <textarea
                    className="fcc-textarea"
                    name="text" id="comment"
                    placeholder='Add comment'
                    value={changeName}
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
        </section>
    )
}
