import { createContext, useCallback, useContext, useState } from "react";
import { hallData as data } from '../data/movie-hall-data';

const initData = {
    hallData: data,
    selectSeat: () => {},
    bookedSeats: [],
    isMouseDown: false,
    setIsMouseDown: () => {}
};

const BookMyShowContext = createContext(initData);

const BookMyShowProvider = ({children}) => {
    const [hallData, setHallData] = useState(data);
    const [bookedSeats, setBookedSeats] = useState([]); 
    const [isMouseDown, setIsMouseDown] = useState(false);

    const updateBookedSeats = useCallback((group, row, seat) => {
        if(seat.type === 'selected') {
            const newSeatInfo = { groupName: group.name, rowName: row.name, seatNumber: seat.number, price: group['seat-price'] };
            bookedSeats.push(newSeatInfo);
            setBookedSeats(bookedSeats);
        } else {
            const updatedBookedSeats = bookedSeats.filter(info => {
                return !(info.groupName===group.name && info.rowName===row.name && info.seatNumber===seat.number);
            });
            setBookedSeats(updatedBookedSeats);
        }
    }, [bookedSeats]);

    const selectSeat = useCallback((type, number, rowName) => {
        const updatedHallData = hallData.map(group => {
            const updatedRows = group.rows.map(row => {
                if(rowName === row.name) {
                    const updatedSeats = row.seats.map(seat => {
                        if(seat.number === number) {
                            seat.type = type;
                            updateBookedSeats(group, row, seat);
                        }
                        return seat;
                    });
                    return { ...row, seats: updatedSeats };
                } 
                return row;
            });
            return {...group, rows: updatedRows };
        });

        setHallData(updatedHallData);
    }, [hallData, updateBookedSeats]);

    return <BookMyShowContext.Provider value={{ 
        hallData, 
        selectSeat, 
        bookedSeats,
        isMouseDown,
        setIsMouseDown
    }}>
        {children}
    </BookMyShowContext.Provider>
};

const useBookMyShow = () => {
    const context = useContext(BookMyShowContext);
    if(context === undefined) {
        throw new Error('useBookMyShow must be within BookMyShowProvider');
    }

    return context;
}

export { BookMyShowProvider, useBookMyShow }