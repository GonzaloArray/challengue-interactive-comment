import './ButtonFollow.css'

export const ButtonFollow = ({ children, follow, setFollow }) => {

    const handleState = () =>{
        if (children == '+') {
            setFollow(++follow);
        }else{
            setFollow(--follow);
        }
    }

    return (
        <button className={`ics-button ${children == '+' ? 'ics-bottom' : 'ics-top'}`} onClick={handleState}> 
            { children }
        </button>
    )
}
