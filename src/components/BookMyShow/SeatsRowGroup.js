import SeatsRow from "./SeatsRow";
import { useBookMyShow } from "../../providers/BookMyShowProvider";

const SeatsRowGroup = ({ name, 'seat-price': seatPrice, rows }) => {
    const { setIsMouseDown } = useBookMyShow();

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    return (
        <div className="seats-group-container">
            <div className="seats-group-name"><b>{name}</b><br />(Price: {seatPrice})</div>
            <div className="seats-group-rows" onMouseUp={handleMouseUp}>
                {[...rows].reverse().map((row, index) => (
                    row.type==='seats-row' ? (
                    <SeatsRow 
                        key={row.name} 
                        {...row} 
                    />) : (<div key={index} className="empty-row" />)
                ))}
            </div>
        </div>
    );
};

export default SeatsRowGroup;