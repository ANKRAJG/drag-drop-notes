import SeatsRowGroup from './SeatsRowGroup';
import { useBookMyShow } from '../../providers/BookMyShowProvider';

const Hall = () => {
    const { hallData, bookedSeats } = useBookMyShow();

    return (
        <div className="booking-container">
            <div className="total-price">
                <b>Total Price: {bookedSeats.reduce((acc, curr) => acc + curr.price, 0)}</b>
            </div>

            <div className="movie-hall">
                {hallData.map(group => (
                    <SeatsRowGroup key={group.name}  {...group} />
                ))}

                <div className="screen">Screen</div>
            </div>
        </div>
    );
};

export default Hall;