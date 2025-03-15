export const ProgressBar = ({ max, current,className }) => {
    const getColor = (index) => {
        if (index < current) return "bg-selectedItem";
        if (index === current) return "bg-primary";
        return "bg-softGray";
    };

    return (
        <div className={`${className} flex items-center gap-2`}>
            {Array.from({ length: max }).map((_, index) => (
                <div
                    key={index}
                    className={`h-2 flex-1 rounded-full ${getColor(index)}`}
                />
            ))}
        </div>
    );
};