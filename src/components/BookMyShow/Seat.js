
const Seat = ({ number, type, handleMouseDown, handleMouseEnter }) => {
    const getClassBasedOnType = () => {
        switch(type) {
            case 'booked': {
                return 'booked-seat';
            }
            case 'selected': {
                return 'selected-seat';
            } 
            case 'empty': {
                return 'empty-seat';
            } 
            default: {
                return ''
            }
        }
    };

    return (
        <button 
            className={`seat ${getClassBasedOnType()}`} 
            //onClick={selectTheSeat} 
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            disabled={['empty', 'booked'].includes(type)}>
                {type!=='empty' ? number : ''}
        </button>
    );
};

export default Seat;