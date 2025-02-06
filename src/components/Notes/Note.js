import { forwardRef } from "react";

const Note = forwardRef(({ content, position, ...props }, ref) => {
    return (
    <div 
        ref={ref}
        className="note-box" 
        style={{ left: `${position?.x}px`, top: `${position?.y}px` }}
        {...props}
    >
       📌 {content}
    </div>
    );
});

export default Note;