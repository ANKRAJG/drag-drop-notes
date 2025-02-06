import { useCallback } from "react";
import { useBookMyShow } from "../../providers/BookMyShowProvider";
import Seat from "./Seat";

const SeatsRow = ({ name, seats }) => {
    const { selectSeat, isMouseDown, setIsMouseDown } = useBookMyShow();
 
    const selectTheSeat = useCallback((seat) => {
        const newType = seat.type === 'available' ? 'selected' : 'available';
        selectSeat(newType, seat.number, name);
    }, [selectSeat, name]);

    const handleMouseDown = (seat) => {
        setIsMouseDown(true);
        selectTheSeat(seat);
    };

    const handleMouseEnter = useCallback((seat) => {
        if(isMouseDown) {
            selectTheSeat(seat);
        }
    }, [isMouseDown, selectTheSeat]);

    return (
        <div className="seats-row-container">
            <div className="seats">
                {seats.map((seat, index) => (
                    <Seat 
                        key={`${seat.number}-${index}`} 
                        //selectTheSeat={selectTheSeat.bind(null, seat)} 
                        {...seat} 
                        handleMouseDown={handleMouseDown.bind(null, seat)}
                        handleMouseEnter={handleMouseEnter.bind(null, seat)}
                    />
                ))}
            </div>
            <div className="seats-row-name"><b>{name}</b></div>
        </div>
    );
};

export default SeatsRow;